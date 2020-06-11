'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  stacks[endStack].push(stacks[startStack].pop());
};


// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
  // make sure player has entered something
  if (startStack === '' || endStack === '') {
  return false;
  }
  if (stacks[startStack] === undefined) {
    return false;
  }
  if (stacks[endStack] === undefined) {
    return false;
  }
  // if (startStack !== "a" || startStack !== "b" || startStack !== "c"){
  //   return false;
  // }
  //make a variable for last piece in the start stack and a variable for the last piece in the end stack
  let currentPiece = stacks[startStack][stacks[startStack].length -1];
  let lastPiece = stacks[endStack][stacks[endStack].length -1];
  //create an array that holds the legal possible values
  const startStackCheck = ["a", "b", "c"];
  //iterate over the array
  for (let i = 0; i < startStackCheck.length; i++){
  //check if start stack input matches any of the possible legal vaules
  // allow move if end stack is empty and the start stck is greater or equal to one(i.e has a piece in it)
  if (currentPiece < lastPiece || stacks[endStack].length === 0) {
    return true;
  }
  // otherwise don't allow move
  else {
    return false;
  }
}
}
// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  // if stack b or c is equal to the win condition
  if (stacks.c.toString() == [4, 3, 2, 1].toString() || stacks.b.toString() == [4, 3, 2, 1].toString()) {
  //move is legal
    return true;
  //otherwise move is not legal
  }else {
    return false;
  }

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  startStack = startStack.trim();
  endStack = endStack.trim();
  startStack = startStack.toLowerCase();
  endStack = endStack.toLowerCase();
  //check if move is legal
  if (isLegal(startStack, endStack)) {
  //move piece if the move is legal
    movePiece(startStack, endStack);
  //check for win
    if (checkForWin()) {
  //if player won give a message and reset the stacks
      console.log("You WIN!!!");
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
    }
  //if the move is not legal tell them
  }else {
    console.log('ILLEGAL MOVE');
  }
}
const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      towersOfHanoi(' A', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
    //check if player just hits enter
    it('should detect if there is no input given' , () => {
      assert.equal(isLegal('', 'c'), false);
    });
    it('should detect if wrong input is given' , () => {
      assert.equal(isLegal('d', 'c'), false);
    });  
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}

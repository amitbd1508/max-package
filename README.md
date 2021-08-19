# Maximum Package

## Thought process for solving the problem 

I identify this problem as a 0-1 Knapsack Problem. So simply I can use  dynamic programing(DP) solution of 0-1 Knapsack to solve this problem, but the DP solution doesn’t work if item weights are not integers.
So we can't use the DP approach. 

In this case we can use a brute force solution, but in this case 2^n number of solution is generated. Which is not a good solution.

Backtracking based solution is better than brute force in this case, but we can use a better solution if we know a bound on best possible solution subtree rooted with every node.
Every time we can update the current best with the best subtree. In the end we can have a solution which is best among all.

This technique is called as branch and bound, and I use it for solving this maximization problem 

## Design pattern 
As we can solve the problem using different types of algorithm depending on inputs, we can use strategy pattern for supporting unlimited approach of this problem.
In this code base i only implemented the BranchAndBound strategy, but in future we can implement any other approach simply by creating a strategy.


## Tools
- TSDX: I use [TSDX](https://tsdx.io/) which is used for creating TypeScript package development.



## Steps to build the library 
- Clone this repository `git clone https://github.com/amitbd1508/max-package.git`
- Go to max-package folder by typing `cd max-package`
- Run `npm install` for installing all dependencies
- Run `npm run build`
- To build this library run `npm run build`
- To test the library go to example folder running `cd example`
- Install all example project dependencies by running `npm install`
- In `example/src/index.ts` file please provide a input file location 
- Run example project by typing `npm start` 

## Test 
To run tests, use `npm run test` 
  

## Publishing to NPM


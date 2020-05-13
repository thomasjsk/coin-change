# Back End Engineering Challenge -- Change

Libera-Bank is building a demonstration for a POS system.  To ensure that cashiers give customers the correct (and optimal) set of change - you will devise an algorithm to compute the change (based on US currency)

- You will create a REST service to:
  - stock the till with coins (PUT & PATCH), either by replacing the till or just adding coins
  - return the value of all coins in the till
  - return the count of each coin in the till
  - given a change amount ( < $1) - compute the optimal (smallest number of coins) needed to fufill the request (given the current coins in the till); if you can't make change note that
  - when you make change, remove those coins from the till
  
  for example: 
  - given 10 dimes and 34 pennies in the till; if the change amount were $0.99 you should offer 9 dimes and 9 pennies
  - given 10 dimes, 3 nickels, and 9 pennies; if the change amount were $0.99 you should offer 9 dimes,  1 nickel, and 4 pennies
  - given 10 dimes; if the change amount were $0.99 you should report that you can't make change

## Requirements:

- Do not include a database (for this iteration store all your data 'in-memory')
- Create tests (either physically or suggest in your README) for any common issues
- Handle errors (in format a business rules)

- develop your solution as a complete package that will be run by the Libera team
  - Include a readme and/or instructions for installing and running
  - Induced instructions on how to run your included test or what those tests are
  - Document any assumptions you made and issues you encountered

## Useful information

- for U.S. coins, assume:
  - quarter = 0.25
  - dime = 0.1
  - nickel = 0.05
  - penny = 0.01 


## Bonus

- add a method to the service to return the values (< $1) for which you can't make change for (as an array) as well as the minimal set of coins you need to continue to make change

##
##
##
## Assumptions and stuff

- I used NestJS as a platform cause it was the fastest to use for me right now and is much like express
- Project was generated with nest cli and I got rid of some garbage boilerplate (probably not all of it)
- I wrote simple paths cause there was no need for more complex with given requirements
- Service starts with an empty state (no coins in till)
- I thought of adding swagger notations but instead I'm providing exported postman collection
- I see no point in writing such common algorithm by my own, so I've picked one from the web and modified it to work as I want to.
I wrote some tests to be sure that it behaves the way I want.
- I prefer to write unit test for separated layers instead of integration tests for each endpoint. Those should be covered by some API tests
- It wasn't said what to do with values > $1, so I'm just throwing a BadRequest exception
- I saw Bonus just when I was about to finish and go to sleep so it's written in a bit rush and with no unit tests, but I think it works fine :)

## Installation

```bash
# install node and npm, then:
$ npm install
```

## Running the app

```bash
# development at: localhost:3000
$ npm run start

# watch mode at: localhost:3000
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test
```

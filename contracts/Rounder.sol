pragma solidity ^0.5.10;

contract Rounder {

    //public variables allows them to have their on getter function
    address public owner;
    uint public granularity;
    uint public output;

    constructor() public {
        owner = msg.sender;
        granularity = 5;
    }

    modifier Owner() {
        //This statement needs to be fufilled or else the error message is displayed
        require(msg.sender == owner, "You need to be the owner to change granularity");
        _; //Allows the rest of the code in the function to be run if the condiition is met
    }
    
    function setGranularity(uint num) public Owner() {
        granularity = num;

    }


    function returnInput(uint256 input) public pure returns (uint256) {
        return input;
    }


    function ChangeOwner(address owner2) public returns(address) {
        owner = owner2;
    }

    //rounding accoridng to the granularity
    function round(uint number) public returns(uint) {
        uint remainder;

        remainder = number % granularity;
        if (remainder == 0) {
            output = number;
        } else {
            output = number + (granularity - remainder);
        }

        return output;
    }




}


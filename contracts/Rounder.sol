pragma solidity ^0.5.10;

contract Rounder {

    //public variables allows them to have their on getter function
    address public owner;
    uint public granularity;
    uint public output;
    mapping(address => uint) public balance;
    

    constructor(address account1, address account2) public {
        owner = msg.sender;
        granularity = 5;
        balance[account1] = 50;
        balance[account2] = 20;
    }


    modifier Owner() {
        //This statement needs to be fufilled or else the error message is displayed
        require(msg.sender == owner, "You need to be the owner to change granularity");
        _; //Allows the rest of the code in the function to be run if the condiition is met
    }
    
    function setGranularity(uint num) public Owner() {
        granularity = num;

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


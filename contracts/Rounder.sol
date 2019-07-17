pragma solidity ^0.5.10;

contract Rounder {

    address public owner;
    uint public gran;
    uint public output;

    constructor() public {
        owner = msg.sender;
        gran = 5;

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

        remainder = number % gran;
        if (remainder == 0) {
            output = number;
        } else {
            output = number + (gran - remainder);
        }
        
        return output;
    }



}


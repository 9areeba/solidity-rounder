pragma solidity ^0.5.10;

contract Rounder {

    address public owner;

    constructor() public {
        owner = msg.sender;

    }

    function returnInput(uint256 input) public pure returns (uint256) {
        return input;
    }


    function ChangeOwner(address owner2) public returns(address) {
        owner = owner2;
       // return owner;
    }
}

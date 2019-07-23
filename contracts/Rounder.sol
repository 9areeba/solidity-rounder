pragma solidity ^0.5.10;
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

/// @title A contract that allows a transaction to be made between a pair of couterparties
/// @author Areeba Safdar
contract Rounder {

    address public owner;
    uint public granularity;
    uint public output;
    mapping(address => uint) public balance;
    
    /// @dev construcutor initialises the paramters of the Rounder Contract and
    /// sets an initial value for the granularity.
    /// @param account1 an address for one of counterparties using this contract
    /// @param account2 an addresss for one of the counteroarites using this contract
    constructor(address account1, address account2) public {
        owner = msg.sender;
        granularity = 5;
        //setting balances for some of the counterparties
        balance[account1] = 50;
        balance[account2] = 20;
    }

    /// @dev modifier to check only the owner has access to a function.
    modifier Owner() {
        //This statement needs to be fufilled or else the error message is displayed
        require(msg.sender == owner, "You need to be the owner to change granularity");
        _;
    }

    /// @dev only allows the owner to change the value of the granularity by using the modifier.
    function setGranularity(uint num) public Owner() {
        granularity = num;

    }

    /// @dev allowing the owner to change.
    /// @param owner2 the address of the new owner
    function ChangeOwner(address owner2) public returns(address) {
        owner = owner2;
    }

    /// @dev rounding numbers accoridng to the granularity
    /// @param number is the value being chekced if it complies with the granularity
    /// @return value of number complying with the granularity
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

    /// @dev tranferring money between two counterparties through the use of SafeMath library
    /// @param value is the amount the sender wants to transfer
    /// @param sender the address of the person wanting to transfer money
    function transferBalance(uint value, address sender, address reciever) public {
        //checking if the amount wanting to be transferred rounds to the granularity
        uint amount = round(value);

        require(balance[sender] > 0, "You are bankrupt!");
        require(amount <= balance[sender], "This account doesn't have enogh money to transfer");
        balance[sender] = SafeMath.sub(balance[sender], amount);
        balance[reciever] = SafeMath.add(balance[reciever], amount);
    }


}

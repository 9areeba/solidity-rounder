
//Importing truffleAssert
const truffleAssert = require('truffle-assertions');

//artifacts.require() teling the test to use the contract "Rounder"
//When importing other contracts, they are usaully sotred in artifacts folder.
const rounder = artifacts.require('Rounder'); 

//contract() gives a list of accounts to use within the tests 
contract('Contract Test', function (accounts) { //accunts has a list of accounts being used in gnache cli

    describe('Functions', function () {
        //these variables are available to any 'it' block within the test suite
        let testContract;
        let deployer = accounts[0];
        
        //beforeEach test this function is run
        beforeEach(async function () {
            //a new version of contract is deployed to allow tests to be run on a clean contract
            testContract = await rounder.new(accounts[1], accounts[2],

                {
                    //from account[0]
                    from: deployer             }
            );
           
        });


        it('Should set the deployer to owner', async function () {
            let result = await testContract.owner();
            assert.equal(result, deployer);
            
        });

        it('Should change the address of the owner to newOwner', async function () {
            let newOwner = accounts[3]; //using the address of accounts[3]
            await testContract.ChangeOwner(newOwner); 
            let result = await testContract.owner();
            assert.equal(result, newOwner);
        });


        it('Should set granularity to a value mentioned by owner', async function () {
            let expectedGranularity = 6
            await testContract.setGranularity(expectedGranularity)
            let result = await testContract.granularity(); 
            assert.equal(result, expectedGranularity);
        });


        it('Should not allow the granularity to be changed as the owner is not calling the fucntion', async function () {
            await truffleAssert.reverts(testContract.setGranularity(
                6, { from: accounts[3] })
            );

        });


        it('Should round 7 to 10 as the granularity is 10.', async function () {
            let expectedNumber = 10
            await testContract.setGranularity(10) //Need to set a value for granularity in each test
            await testContract.round(7);
            let output = await testContract.output();
            assert.equal(output, expectedNumber);
        });

        it('Should round 16 to 30 as the granularity is 15.', async function () {
            let expectedNumber = 30
            await testContract.setGranularity(15)
            await testContract.round(16);
            let output = await testContract.output();
            assert.equal(output, expectedNumber);
        });


        it("Should not allow money to be transferred as the account doesn't have enough money ", async function () {
            //uisng truffleAssert.revert() to deal the revert from require statements
            await truffleAssert.reverts(testContract.transferBalance(
                60, accounts[1], accounts[2])
            );
        });

        it("Should not allow transaction to take place as the sender's balance is 0" , async function () {
            await truffleAssert.reverts(testContract.transferBalance(
                60, accounts[5], accounts[2])
            );
        });

        
        it('Should transfer money between two accounts by rounding up to the granularity', async function () {
            //getting the balance of the counterparties
            let senderBalance = await testContract.balance(accounts[1]);
            let recieverBalance = await testContract.balance(accounts[2]);

            //setting expected balances after the transaction
            let expectedBalanceOfReciever = +recieverBalance + +10; 
            let expectedBalanceOfSender = await +senderBalance - +10;

            await testContract.transferBalance(8, accounts[1], accounts[2]);

            senderBalance = await testContract.balance(accounts[1]);
            recieverBalance = await testContract.balance(accounts[2]);

            assert.equal(recieverBalance, expectedBalanceOfReciever);
            assert.equal(senderBalance.toString(), expectedBalanceOfSender.toString());
        });



    });
});

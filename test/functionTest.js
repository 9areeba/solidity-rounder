
//artifacts.require() teling the test to use the contract "Rounder"
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
            testContract = await rounder.new( 

                {
                    //from account[0]
                    from: deployer                }
            );
        });


        it('Should return the input', async function () {
            expectedOutput = 15;
            let tx = await testContract.returnInput(expectedOutput); //using the functin retrunInput from the Rounder contract
            assert.equal(tx, expectedOutput);
        });


        it('Should set the deployer to owner', async function () {
            let result = await testContract.owner(); //just a global variable so that's why result is not a transaction value.
            assert.equal(result, deployer);
            
        });

        it('Should change the address of the owner to newOwner', async function () {
            let newOwner = accounts[3]; //using the address of accounts[3]
            let result1 = await testContract.ChangeOwner(newOwner); //<---This is the value of the transaction
            let result = await testContract.owner();
            assert.equal(result, newOwner);
        });


        it('Should set granularity to 5', async function () {
            let result = await testContract.gran(); //just a global variable so that's why result is not a transaction value.
            assert.equal(result, 5);
        });


        it('Should round 7 to granularity', async function () {
            let expectedNumber = 10
            let result1 = await testContract.round(7);
            let output = await testContract.output();
            assert.equal(output, expectedNumber);
        });

        it('Should round 5 to granularity', async function () {
            let expectedNumber = 5
            let result1 = await testContract.round(5);
            let output = await testContract.output();
            assert.equal(output, expectedNumber);
        });

        it('Should round 1 to granularity', async function () {
            let expectedNumber = 5
            let result1 = await testContract.round(1);
            let output = await testContract.output();
            assert.equal(output, expectedNumber);
        });


    });
});

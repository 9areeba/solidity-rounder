
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
            await testContract.ChangeOwner(newOwner); //<---This is the value of the transaction
            let result = await testContract.owner();
            assert.equal(result, newOwner);
        });


        it('Should set granularity to a value mentioned by user', async function () {
            let expectedGranularity = 5
            await testContract.setGranularity(expectedGranularity)
            let result = await testContract.granularity(); 
            assert.equal(result, expectedGranularity);
        });


        it('Should round 7 to granularity', async function () {
            let expectedNumber = 10
            await testContract.setGranularity(10) //Need to set a value for granularity in each test
            await testContract.round(7);
            let output = await testContract.output();
            assert.equal(output, expectedNumber);
        });

        it('Should round 5 to granularity', async function () {
            let expectedNumber = 7
            await testContract.setGranularity(7)
            await testContract.round(5);
            let output = await testContract.output();
            assert.equal(output, expectedNumber);
        });

        it('Should round 16 to granularity', async function () {
            let expectedNumber = 30
            await testContract.setGranularity(15)
            await testContract.round(16);
            let output = await testContract.output();
            assert.equal(output, expectedNumber);
        });


    });
});

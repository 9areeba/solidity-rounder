
const rounder = artifacts.require('Rounder');

contract('Contract Test', function (accounts) { //accunts has a list of accounts being used in gnache cli

    describe('Functions', function () {
        let testContract;
        let deployer = accounts[0];

        beforeEach(async function () {
            testContract = await rounder.new(
                {
                    //from account[0]
                    from: deployer                }
            );
        });


        it('Should return the input', async function () {
            expectedOutput = 15;
            let tx = await testContract.returnInput(expectedOutput);
            assert.equal(tx, expectedOutput);
        });


        it('Should set the deployer to owner', async function () {
            let result = await testContract.owner();
            assert.equal(result, deployer);
            
        });

        it('Should change the address of the owner to newOwner', async function () {
            let newOwner = accounts[3]; //using the address of accounts[3]
            let result1 = await testContract.ChangeOwner(newOwner);
            let result = await testContract.owner();
            assert.equal(result, newOwner);
        });


    });
});

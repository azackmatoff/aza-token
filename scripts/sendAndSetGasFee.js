const hre = require("hardhat");

const AzTokenJson = require('../artifacts/contracts/AzToken.sol/AzToken.json');

const abi = AzTokenJson.abi;

async function main() {
    // Note: Use the correct network name in the provider configuration.
    const alchemy = new hre.ethers.AlchemyProvider(
        'maticmum',
        process.env.ALCHEMY_API_KEY
    );
    // We're using the same wallet private key for the wallet that you
    // created in Step 6. 
    const userWallet = new ethers.Wallet(process.env.PRIVATE_KEY, alchemy);

    // Get the deployed contract. We need both the specific CONTRACT_ADDRESS
    const AzToken = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,  // Assuming CONTRACT_ADDRESS is set in your environment
        abi,
        userWallet
    );

   const setTx1 = await AzToken.send(process.env.SEND_HERE, 10);
   const setTx1Response = await setTx1.wait();

   console.log("setTx1Response:", setTx1Response);
   
   // Log specific properties
   console.log("Block Number:", setTx1Response.blockNumber);
   console.log("Transaction Hash:", setTx1Response.hash);
   console.log("Gas Used:", setTx1Response.gasUsed.toString());

    await AzToken.setGasFee(7);
 
    const setTx3 = await AzToken.getGasFee();
    console.log(`newly set gasFee: ${setTx3.toString()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});

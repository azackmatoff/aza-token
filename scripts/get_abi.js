
const hre = require("hardhat");
const AzaTokenJson = require('../artifacts/contracts/AzaToken.sol/AzaToken.json');

const abi = AzaTokenJson.abi;

console.log(`${abi}`);

async function main() {

    const alchemy = new hre.ethers.providers.AlchemyProvider(
        'maticmum',
        process.env.ALCHEMY_API_KEY
    );
    // We're using the same wallet private key for the wallet that you
    // created in Step 6. 
    const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy);

    // Get the deployed contract. We need both the specific CONTRACT_ADDRESS
    const AzaToken = new hre.ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        abi,
        userWallet
    )


    const setTx1 = await Greeter.send("0xEAB04428f9FAB5d205D002FC7D45c754b501a8FC", 10);
    await setTx1.wait().then.console.log(`${setTx1}`);
   

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});

//  npx hardhat verify 0xf9b1C204cC33F80Bc1FF0e17cEf9BF69D8bE328E --network matic
//  npx hardhat run scripts/deploy.js --network mumbai
//  npx hardhat run scripts/deploy.js --network matic

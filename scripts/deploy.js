
const hre = require("hardhat");

async function main() {

  const AzaToken = await hre.ethers.deployContract("AzaToken");
 
  await AzaToken.waitForDeployment();
  console.log(
      `Counter contract deployed ${AzaToken.target}`
  );
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

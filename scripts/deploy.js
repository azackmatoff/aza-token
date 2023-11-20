
const hre = require("hardhat");

async function main() {

  const AzToken = await hre.ethers.deployContract("AzToken");
 
  await AzToken.waitForDeployment();
  console.log(
      `Counter contract deployed ${AzToken.target}`
  );
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

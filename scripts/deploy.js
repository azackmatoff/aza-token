
const hre = require("hardhat");

async function main() {

  const AzaToken = await hre.ethers.deployContract("AzaToken");
 
  await AzaToken.waitForDeployment();
  console.log(
      `Counter contract deployed ${AzaToken.target}`
  );

  // Set the logo URL after deployment
  const logoURL = 'https://github.com/azackmatoff/aza-token/blob/main/aza.json';
  await AzaToken.setLogo(logoURL);

  console.log(`AzaToken deployed to:', ${AzaToken.target}`);
  console.log(`Logo URL set to:, ${logoURL}`);
   
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

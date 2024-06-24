async function main() {
  try {
      const { ethers } = require("hardhat");
      const voting = await ethers.getContractFactory("Lock");

      const voting_ = await voting.deploy(["bagri", "vikas", "hemant", "abhishek"], 120);

      console.log("Contract Address:", voting_.address);
  } catch (error) {
      console.error("Error deploying contract:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error("Script error:", error);
      process.exit(1);
  });

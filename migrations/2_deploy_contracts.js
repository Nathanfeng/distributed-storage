var DistributedStorage = artifacts.require("./DistributedStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(DistributedStorage);
};

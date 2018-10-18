var HelloWorld = artifacts.require("./HelloWorld.sci");

module.exports = function(deployer) {
  deployer.deploy(HelloWorld);
};

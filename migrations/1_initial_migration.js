var Migrations = artifacts.require("./Migrations.sci");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

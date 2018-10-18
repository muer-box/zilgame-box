var HelloWorld = artifacts.require("./HelloWorld.sci");

contract('HelloWorld', function(accounts) {
  it("should setHello correctly", function() {
    return HelloWorld.deployed().then(function(instance) {
      return instance.setHello.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(instance.mutable.welcome_msg, accounts[0], "setHello failed to set for first account");
    });
  });
});

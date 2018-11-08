const TestHelper = require('./test-helper');
const assert = require('assert');

// **** Please copy the `contractAddress` from Kaya console after running `muer deploy` ********
const contractAddress = '17843f270b8fc8717e684e76b1d44cfd52421b59';

describe('Donate', async () => {
  const contract = new TestHelper.Contract(contractAddress);
  const account = new TestHelper.Account();
  let nonce;

  it('Get account', async () => {
    try {
      const data = await account.getBalance();
      console.log('Current account: ', data.result);
      nonce = data.result.nonce;
      assert.ok(nonce);
    } catch (err) {
      console.log(err);
      assert(!err);
    }
  });

  it('Donate 3 Zilliqa', async function () {
    this.timeout(5000);
    const params = []; // if params are empty, just pass [] or null
    try {
      const data = await contract.callTransition(nonce, 'Donate', 3, params);
      assert.ok(data);
      console.log('txid', data.result);
    } catch (err) {
      console.log(err);
      assert(!err);
    }
  });

  it('Get account', async () => {
    try {
      const data = await account.getBalance();
      console.log('Current account: ', data.result);
      nonce = data.result.nonce;
      assert.ok(nonce);
    } catch (err) {
      console.log(err);
      assert(!err);
    }
  });


  it('GetFunds Transition', async function () {
    this.timeout(5000);
    const params = []; // if params are empty, just pass [] or null
    try {
      const data = await contract.callTransition(nonce, 'GetFunds', 0, params);
      assert.ok(data);
      console.log('txid', data.result);
    } catch (err) {
      console.log(err);
      assert(!err);
    }
  });

  it('Get account', async () => {
    try {
      const data = await account.getBalance();
      console.log('Current account: ', data.result);
      nonce = data.result.nonce;
      assert.ok(nonce);
    } catch (err) {
      console.log(err);
      assert(!err);
    }
  });

  it('Get mutable _balance', async function () {
    try {
      const data = await contract.getState();
      const balance = contract.getVariableByName(data.result, '_balance')
      console.log(balance.value)
      assert.ok(balance.value);
    } catch (err) {
      console.log(err);
      assert(!err);
    }
  });
});

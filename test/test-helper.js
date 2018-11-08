const BN = require('bn.js');
const DeployOption = require('../deploy.json');
const { Zilliqa } = require('zilliqa-js');
const url = DeployOption.networks.development.port ? `${DeployOption.networks.development.protocol}://${DeployOption.networks.development.host}:${DeployOption.networks.development.port}`:`${DeployOption.networks.development.protocol}://${DeployOption.networks.development.host}`;

const zilliqa = new Zilliqa({
  nodeUrl: url,
});

const privateKey = DeployOption.test.account;
const defaultSenderAddress = zilliqa.util.getAddressFromPrivateKey(privateKey);
const sendGasPrice = DeployOption.test.gasPrice;
const sendGasLimit = DeployOption.test.gasLimit;

class Contract {
  constructor(address) {
    this.address = address;
  }

  getVariableByName(variables, name){
    let variable = null;
    for(let i=0; i<variables.length; i++)
    {
      if(variables[i].vname === name)
      {
        variable = variables[i];
        break;
      }
    }
    return variable;
  }

  async isConnected() {
    return new Promise((resolve, reject) => {
      zilliqa.node.isConnected((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    });
  }

  async getState() {
    return new Promise((resolve, reject) => {
      zilliqa.node.getSmartContractState({ address: this.address }, (err, data) => {
        if (err || (data.result && data.result.Error)) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    });
  }

  async getInit() {
    return new Promise((resolve, reject) => {
      zilliqa.node.getSmartContractInit({ address: this.address }, (err, data) => {
        if (err || (data.result && data.result.Error)) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    });
  }

  async getBalance() {
    return new Promise((resolve, reject) => {
      zilliqa.node.getBalance({ address: this.address }, (err, data) => {
        if (err || (data.result && data.result.Error)) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    });
  }

  async callTransition(nonce, method, sendAmount, params = []) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        "_tag": method,
        "_amount": new BN(sendAmount),
        "_sender": `0x${defaultSenderAddress.toUpperCase()}`,
        "params": params
      });

      // transaction details
      const transactionDetails = {
        version: 0,
        nonce: (nonce + 1),
        to: this.address,
        amount: new BN(sendAmount),
        gasPrice: parseFloat(sendGasPrice),
        gasLimit: parseFloat(sendGasLimit),
        data: data
      };

      const txn = zilliqa.util.createTransactionJson(privateKey, transactionDetails);
      zilliqa.node.createTransaction(txn, (err, data) => {
        if (err || (data.result && data.result.Error)) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

class Account {
  async getBalance() {
    return new Promise((resolve, reject) => {
      zilliqa.node.getBalance({ address: defaultSenderAddress }, (err, data) => {
        if (err || (data.result && data.result.Error)) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    });
  }
}

const TestHelper = {
  Contract,
  Account
};

module.exports = TestHelper;

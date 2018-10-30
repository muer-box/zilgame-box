# MuerBox (Zilliqa and Scilla)

Create a new project folder and unbox

```
mkdir newproject && cd $_

muer unbox crowdfund
```

# MuerBox Fold Structure

```
<projectfolder>
- contracts
	- contract.scilla
	- init.json
- test
	- output
 		- output_1.json
	- blockchain_1.json
	- message_1.json
	- state_1.json
- deploy.json
- muer.js

```

### contracts folder
`contracts` folder contains `*.scilla` contract files and `init.json`

`init.json` is required to deploy the contract. Please note the address value of owner is set to the first test account address, this will be replaced at runtime by the address of deployAccount specified in `./deploy.json` when you use `muer deploy`

```
{
        "vname" : "owner",
        "type" : "ByStr20", 
        "value" : "0x7bb3b0e8a59f3f61d9bff038f4aeb42cae2ecce8" // this will be replaced at runtime
}  
```
### test folder

`test` folder contains test input json files for `muer test`

Input json files are grouped by `suffix` naming convention. 
For example test case `1` will have below files:

```
blockchain_1.json
message_1.json
state_1.json
```

So when you run `muer test 1`, it will take input json files and run through `scilla-interpreter` and output the result `output_1.json` in `./test/output` folder. Then it automatically compares to the test cases specified (coming soon)

### deploy.json

`deploy.json` specify deployment and test configurations for `muer deploy` and `muer test` (coming soon)

`deploy.json` Example:

```
{
  "networks": {
    "development": {
      "protocol": "http",
      "host": "127.0.0.1",
      "port": 4200
    }
  },
  "deploy":{
  	"account": "db11cfa086b92497c8ed5a4cc6edb3a5bfe3a640c43ffb9fc6aa0873c56f2ee3",
  	"version":0,
  	"amount":0,
  	"gasPrice": 1,
  	"gasLimit":2000
  },
  "accounts":[
  	"db11cfa086b92497c8ed5a4cc6edb3a5bfe3a640c43ffb9fc6aa0873c56f2ee3",
  	"e53d1c3edaffc7a7bab5418eb836cf75819a82872b4a1a0f1c7fcf5c3e020b89",
  	"d96e9eb5b782a80ea153c937fa83e5948485fbfc8b7e7c069d7b914dbc350aba",
  	"e7f59a4beb997a02a13e0d5e025b39a6f0adc64d37bb1e6a849a4863b4680411",
  	"589417286a3213dceb37f8f89bd164c3505a4cec9200c61f7c6db13a30a71b45",
  	"5430365143ce0154b682301d0ab731897221906a7054bbf5bd83c7663a6cbc40",
  	"1080d2cca18ace8225354ac021f9977404cee46f1d12e9981af8c36322eac1a4",
  	"254d9924fc1dcdca44ce92d80255c6a0bb690f867abde80e626fbfef4d357004",
  	"b8fc4e270594d87d3f728d0873a38fb0896ea83bd6f96b4f3c9ff0a29122efe4",
  	"b87f4ba7dcd6e60f2cca8352c89904e3993c5b2b0b608d255002edcda6374de4"
  ]
}
```

`networks` specify the target blockchain network.

`deploy` specify the privateKey of the account to deploy the contract

`accounts` specify a list of test accounts for development. You can reference them by accounts[0]... accounts[9] in your test cases

For local development on Kaya, we **strongly recommend** to start Kaya on `fixtures` mode so it generates the same privateKeys and accounts.

```
$ node server.js -f test/account-fixtures.json -r false
```

`deploy.json` in MuerBox already has 10 test account privateKeys from Kaya `fixtures` mode, so you don't have to change it. The contract deploy account is set to the first test account (account[0]). Optionally you can change it to other test account.

If you don't start Kaya on `fixtures` mode, then you need to copy the deploy account privateKey and test account privateKeys from Kaya output screen

# MuerBox Usage

## Create a project

create a project folder, note that project folder needs to be empty before using `init` or `unbox` function

```
mkdir mynewproject
cd mynewproject
```

### Initialise Muer project with bare template
```
muer init
```


### Initialise Muer project with box template 

```
muer unbox <boxname>
```

for example:
```
muer unbox crowdfund
```

### Check contract 

Automatically check `.scilla` contract files in ./contracts folder

```
muer check
```

### Deploy to selected network
```
muer deploy
```

### Develop mode (Development in progress)
```
muer develop
```

### Test contract (Development in progress)
```
muer test
```

# MuerBox List



| Box        | description           | command  |
| ------------- |:-------------:| -----:|
| HelloWorld      | simple contract for set and get | `muer unbox helloworld` |
| CrowdFund      | Donate, Claim and Retrieve Fund | `muer unbox crowdfund` |
| FungibleToken      | Fungible token example | `muer unbox fungibletoken` |
| NonFungibleToken      | Non fungible token example | `muer unbox nonfungibletoken` |
| ZilGame      | A simple game to play and win rewards | `muer unbox zilgame` |
| Auction      | Running an auction and bidding | `muer unbox auction` |
| Bookstore      | A library contract that can manage books | `muer unbox bookstore` |
| Schnorr      | Schnorr signature example | `muer unbox schnorr` |









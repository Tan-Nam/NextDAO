const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("../ethereum/compile");
const voteContract = require("../ethereum/build/vote.json");

const provider = new HDWalletProvider(
  "giggle nation twist slot trial index cheap develop silent female glance urge",
  "https://rinkeby.infura.io/v3/b9757157fcc44f8bb15ef5862439c626"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts)
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(voteContract.interface))
    .deploy({ data: voteContract.bytecode , arguments: ['Hello', 100] })
    .send({ gas: "1000000", from: accounts[0] });
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();

const Web3 = require('web3')

const web3 = new Web3('http://localhost:7545')

const contractABI = require('../constants/TokenABI.json')

const contractAddress = '0xF86cAb7698eC8BBD149b82E35958c20961eeA25F'

const contractOwner = '0xdDF3c8bD7060A3FAA727C1D0B2802aBD07ABD0F2'

const getBalanceOfAddress = async address => {
  const Token = await new web3.eth.Contract(contractABI, contractAddress)

  return await Token.methods.balanceOf(address).call()
}

const getTotalTokenSupply = async () => {
  const Token = await new web3.eth.Contract(contractABI, contractAddress)

  return await Token.methods.totalSupply().call()
}

const transferToken = async (sender, receiver, amount) => {
  const Token = await new web3.eth.Contract(contractABI, contractAddress)

  return await Token.methods.transfer(receiver, amount).send({ from: sender })
}

const mintToken = async (receiver, amount) => {
  const Token = await new web3.eth.Contract(contractABI, contractAddress)

  return await Token.methods
    .mint(receiver, amount)
    .send({ from: contractOwner })
}

const burnToken = async amount => {
  const Token = await new web3.eth.Contract(contractABI, contractAddress)

  return await Token.methods.burn(amount).send({ from: contractOwner })
}

module.exports = {
  getBalanceOfAddress,
  getTotalTokenSupply,
  transferToken,
  mintToken,
  burnToken
}

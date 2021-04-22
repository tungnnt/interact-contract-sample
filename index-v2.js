const Web3 = require('web3')

const web3 = new Web3('https://rpc.testnet.tomochain.com')

const contractABI = require('/root/Projects/SOTA/learn/solidity-learn/constants/TokenV2ABI.json')

const contractAddress = '0x32b21D59edd8056B9F43E6205E6e48Ad61b8C0Bb'

const contractOwner = '0xe28AC66dDeFdc6212E9e928cb45BCf4A71f629F8'

setImmediate(async () => {
  const Token = await new web3.eth.Contract(contractABI, contractAddress)

  let password

  const newAccount = await web3.eth.personal.newAccount(password)

  console.log(newAccount)

  console.log(
    contractOwner,
    await Token.methods.balanceOf(contractOwner).call()
  )
})

// const getBalanceOfAddress = async address => {
//   const Token = await new web3.eth.Contract(contractABI, contractAddress)

//   return await Token.methods.balanceOf(address).call()
// }

// const getTotalTokenSupply = async () => {
//   const Token = await new web3.eth.Contract(contractABI, contractAddress)

//   return await Token.methods.totalSupply().call()
// }

// const transferToken = async ({ sender, senderPassword }, receiver, amount) => {
//   const isOwner = await isValidPassword(sender, senderPassword)

//   if (!isOwner) {
//     throw new Error('TRANFER_TOKEN.INVALID_SENDER')
//   }

//   const Token = await new web3.eth.Contract(contractABI, contractAddress)

//   return await Token.methods.transfer(receiver, amount).send({ from: sender })
// }

// const mintToken = async (receiver, amount) => {
//   const Token = await new web3.eth.Contract(contractABI, contractAddress)

//   return await Token.methods
//     .mint(receiver, amount)
//     .send({ from: contractOwner })
// }

// const burnToken = async amount => {
//   const Token = await new web3.eth.Contract(contractABI, contractAddress)

//   return await Token.methods.burn(amount).send({ from: contractOwner })
// }

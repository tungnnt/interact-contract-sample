const Web3 = require('web3')

const web3 = new Web3('https://ropsten.infura.io/v3/4de328e80412487faea850533e750278')

const contractABI = require('./constants/TokenTomo.json')

const contractAddress = '0x3aBA09EcdCE224B42eCa2630769c290567a27C54'

const contractOwner = '0x65f19657B4D6FC7b4532d67B5b097C863d7B90F4'

setImmediate(async () => {
  const Token = await new web3.eth.Contract(contractABI, contractAddress)

  //   console.log(await Token.methods.totalSupply().call())

  //   console.log(await Token.methods.balanceOf(contractOwner).call())

  //   console.log(await web3.eth.getBalance(contractOwner))

  const newAccount = await web3.eth.personal.newAccount('123456')

  await web3.eth.personal.unlockAccount(newAccount, '123456')

  console.log({ newAccount })

  //   console.log(await web3.eth.getAccounts())

  //   await Token.methods.mint(newAccount, 1).send({ from: contractOwner })

  console.log(await Token.methods.balanceOf(newAccount).call())

  console.log(
    await Token.methods.mint(newAccount, 1).send({ from: contractOwner })
  )
})

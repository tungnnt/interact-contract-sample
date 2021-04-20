const {
  mintToken,
  getBalanceOfAddress,
  transferToken
} = require('./helpers/contract')
const { createWalletV2 } = require('./helpers/wallet')

setImmediate(async () => {
  let response

  // create wallet_1 with 100 HPR tokens
  const wallet_1 = await createWalletV2('12345')

  await mintToken(wallet_1, 100)

  response = await getBalanceOfAddress(wallet_1)

  console.log('Wallet 1:', { address: wallet_1, balance: response })

  // create wallet_2 with 50 HPR tokens
  const wallet_2 = await createWalletV2('54321')

  await mintToken(wallet_2, 50)

  response = await getBalanceOfAddress(wallet_2)

  console.log('Wallet 2:', { address: wallet_2, balance: response })

  // transfer 10 HPR tokens from wallet_1 to wallet_2
  response = await transferToken(
    { sender: wallet_1, senderPassword: '12345' },
    wallet_2,
    10
  )

  response = await getBalanceOfAddress(wallet_1)

  console.log('Wallet 1:', { address: wallet_1, balance: response })

  response = await getBalanceOfAddress(wallet_2)

  console.log('Wallet 2:', { address: wallet_2, balance: response })
})

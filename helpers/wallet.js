const Web3 = require('web3')

const web3 = new Web3('http://localhost:7545')

const createWallet = async () => {
  return await web3.eth.accounts.create()
}

const encryptWallet = async (web3Wallet, password) => {
  const keyStore = await web3.eth.accounts.encrypt(
    web3Wallet.privateKey,
    password
  )

  const {
    id,
    address,
    crypto: {
      ciphertext,
      cipherparams: { iv },
      kdfparams: { salt },
      mac
    }
  } = keyStore

  const keyStoreInfo = {
    id,
    address,
    ciphertext,
    iv,
    salt,
    mac
  }

  return Object.keys(keyStoreInfo)
    .map(key => keyStoreInfo[key])
    .join('|')
}

const decryptWallet = async (keyStore, password) => {
  const [id, address, ciphertext, iv, salt, mac] = keyStore.split('|')

  const web3Wallet = await web3.eth.accounts.decrypt(
    {
      version: 3,
      id,
      address,
      crypto: {
        ciphertext,
        cipherparams: {
          iv
        },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
          dklen: 32,
          salt: salt,
          n: 8192,
          r: 8,
          p: 1
        },
        mac
      }
    },
    password
  )

  return web3Wallet
}

module.exports = {
  createWallet,
  encryptWallet,
  decryptWallet
}

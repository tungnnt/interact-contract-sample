const prompts = require('prompts')
const clipboardy = require('clipboardy')

setImmediate(async () => {
  const { value: contractFilePath } = await prompts({
    type: 'text',
    name: 'value',
    message: 'Enter built contract file path: ',
    validate: value => value.split('.').pop() === 'json'
  })

  const content = require(`${contractFilePath}`)

  if (Object.keys(content).indexOf('contractName') > -1) {
    const { value: isSaveToClipboard } = await prompts({
      type: 'select',
      name: 'value',
      message: 'Do you want to save to clipboard: ',
      choices: [
        {
          title: 'Yes',
          value: true
        },
        {
          title: 'No',
          value: false
        }
      ]
    })

    if (isSaveToClipboard) {
      clipboardy.writeSync(JSON.stringify(content[`abi`]))
    }
  } else {
    const {
      output: { contracts }
    } = content

    const { value: selectedContract } = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choosee contract: ',
      choices: Object.keys(contracts).map(key => ({
        title: key.split('/').pop(),
        value: contracts[key]
      }))
    })

    console.log({ selectedContract })

    const [contractName] = Object.keys(selectedContract)

    console.log({ contractName })

    const contractABI = selectedContract[`${contractName}`][`abi`]

    const { value: isSaveToClipboard } = await prompts({
      type: 'select',
      name: 'value',
      message: 'Do you want to save to clipboard: ',
      choices: [
        {
          title: 'Yes',
          value: true
        },
        {
          title: 'No',
          value: false
        }
      ]
    })

    if (isSaveToClipboard) {
      clipboardy.writeSync(JSON.stringify(contractABI))
    }
  }
})

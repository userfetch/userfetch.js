import os from 'os'
import fs from 'fs'
import path from 'path'

const configDir = path.join(os.homedir(), '.userfetch/')

const message = `To use this app you must first create a Github Personal Access Token
Go to https://github.com/settings/tokens/new and generate a new token
with \`repo\`, \`read:org\`, and \`user\` scopes
Then run \`userfetch --token\` and use stdin to enter the token

Run \`userfetch --help\` to get a complete list of available options
Check https://github.com/aryan02420/userfetch/wiki/Docs for more info
`

export default async function () {
  console.log(message)
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir)
  try {
    await fs.promises.copyFile(
      './stubs/.env',
      path.join(configDir, '.env'),
      fs.constants.COPYFILE_EXCL
    )
  } catch (err) {}
  fs.promises.copyFile('./stubs/config.mjs', path.join(configDir, 'config.mjs'))
  fs.promises.copyFile('./stubs/ascii', path.join(configDir, 'ascii'))
}

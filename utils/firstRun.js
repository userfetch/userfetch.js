import os from 'os'
import fs from 'fs'
import path from 'path'

const configDir = path.resolve(os.homedir(), '.userfetch/')
const message = 
`To use this app you must first create a Github Personal Access Token
Go to https://github.com/settings/tokens/new and generate a new token with \`repo\`, \`read:org\`, and \`user\` scopes
then update the .env file at ${configDir} with your token

run \`userfetch --help\` for more options
see https://github.com/aryan02420/userfetch/docs for more info
`

export default async function() {
    console.log(message)
    if (!fs.existsSync(configDir)) fs.mkdirSync(configDir)
    // TODO do not overwrite this
    fs.promises.copyFile('./configDir/.env', path.resolve(configDir, '.env'))
    fs.promises.copyFile('./configDir/config.mjs', path.resolve(configDir, 'config.mjs'))
    fs.promises.copyFile('./configDir/ascii', path.resolve(configDir, 'ascii'))
}
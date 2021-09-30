import os from 'os'
import fs from 'fs'
import path from 'path'

const message = 
`Hello
`

export default async function() {
    console.log(message)
    const configDir = path.resolve(os.homedir(), '.userfetch/')
    if (!fs.existsSync(configDir)) fs.mkdirSync(configDir)
    fs.promises.copyFile('./configDir/.env', path.resolve(configDir, '.env'))
    fs.promises.copyFile('./configDir/config.mjs', path.resolve(configDir, 'config.mjs'))
    fs.promises.copyFile('./configDir/ascii', path.resolve(configDir, 'ascii'))
}
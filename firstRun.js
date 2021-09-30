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
    fs.promises.writeFile(path.resolve(configDir, '.env'), 'github_token=ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    fs.promises.copyFile('./config.js', path.resolve(configDir, 'config.mjs'))
    fs.promises.copyFile('./ascii', path.resolve(configDir, 'ascii'))
}
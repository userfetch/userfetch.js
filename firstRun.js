import os from 'os'
import fs from 'fs'
import path from 'path'

export default async function() {
    const configDir = path.resolve(os.homedir(), '.userfetch/')
    if (!fs.existsSync(configDir)) fs.mkdirSync(configDir)
    fs.promises.writeFile(path.resolve(configDir, '.env'), 'github_token=ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    fs.promises.copyFile('./config.js', path.resolve(configDir, 'user_config.js'))
    fs.promises.copyFile('./config.js', path.resolve(configDir, 'default_config.js'))
}
import os from 'os'
import fs from 'fs'
import url from 'url'
import path from 'path'

import chalk from 'chalk'

import getAndSaveToken from './getAndSaveToken.js'

const configDir = path.join(os.homedir(), '.userfetch/')
const currDir = path.dirname(url.fileURLToPath(import.meta.url))

const message = chalk`To use this tool, you must first create a Github Personal Access Token
Go to >> {bgBlack.white.bold https://github.com/settings/tokens/new?scopes=repo,read:org,read:user,user:email} <<
and generate a new token with \`repo, \`read:org\`, \`read:user\`, \`user:email\` scopes
Check https://github.com/userfetch/userfetch.js/wiki/Docs for more info
`

export default async function () {
  console.log(message)
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir)
  await Promise.all([
    getAndSaveToken(),
    fs.promises.copyFile(path.join(currDir, '..', 'stubs', 'config.mjs'), path.join(configDir, 'config.mjs')),
    fs.promises.copyFile(path.join(currDir, '..', 'stubs', 'ascii'), path.join(configDir, 'ascii')),
  ])
}

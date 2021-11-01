import fs from 'fs'
import path from 'path'

import chalk from 'chalk'

import { getAndSaveToken } from './getAndSaveToken.js'
import { CONFIG_DIR, PROJ_ROOT } from './constants.js'

const message = chalk`To use this tool, you must first create a Github Personal Access Token
Go to >> {bgBlack.white.bold https://github.com/settings/tokens/new?scopes=repo,read:org,read:user,user:email} <<
and generate a new token with \`repo, \`read:org\`, \`read:user\`, \`user:email\` scopes

Docs: https://github.com/userfetch/userfetch.js/wiki/Docs
Config dir: ${CONFIG_DIR}
`

async function firstRun() {
  console.log(message)
  if (!fs.existsSync(CONFIG_DIR)) fs.mkdirSync(CONFIG_DIR)
  await Promise.all([
    fs.promises.copyFile(
      path.join(PROJ_ROOT, 'stubs', 'config.mjs'),
      path.join(CONFIG_DIR, 'config.mjs')
    ),
    fs.promises.copyFile(
      path.join(PROJ_ROOT, 'stubs', 'ascii'),
      path.join(CONFIG_DIR, 'ascii')
    ),
    getAndSaveToken(),
  ])
}

export { firstRun }

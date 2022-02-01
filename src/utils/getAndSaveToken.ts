import fs from 'fs'
import path from 'path'

import inquirer from 'inquirer'

import { CONFIG_DIR } from './constants.js'

interface IAuthTokens {
  github_token?: string
}

const envFile = path.join(CONFIG_DIR, '.env')

async function saveToEnv(tokens: IAuthTokens) {
  let data: string[] = []
  if (tokens.github_token)
    data.push(`github_token=${tokens.github_token}`)
  // TODO: keep current values of other tokens
  await fs.promises.writeFile(envFile, data.join('\n'))
}

async function getAndSaveToken() {
  const { github_token } = await inquirer.prompt([
    {
      type: 'password',
      mask: '*',
      name: 'github_token',
      message: 'GitHub PAT (skip)',
    },
  ])
  await saveToEnv({ github_token })
}

export { getAndSaveToken }

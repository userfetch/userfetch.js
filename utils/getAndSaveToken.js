import fs from 'fs'
import path from 'path'

import inquirer from 'inquirer'

import { CONFIG_DIR } from './constants.js'

const envFile = path.join(CONFIG_DIR, '.env')

async function saveToEnv({ github_token }) {
  if (!github_token) return
  const data = `github_token=${github_token}\n`
  await fs.promises.writeFile(envFile, data)
}

export default async function () {
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

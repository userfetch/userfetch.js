#!/usr/bin/env node

import os from 'os'
import fs from 'fs'
import path from 'path'

import dotenv from 'dotenv'
import inquirer from 'inquirer'

import yargs from './utils/yargs.js'
import githubAPI from './apis/github.js'
import firstRun from './utils/firstRun.js'
import saveToken from './utils/saveToken.js'

import renderer from './renderer/terminal.js'

// start spinner

const args = yargs(process.argv)

const configDir = path.join(os.homedir(), '.userfetch/')
if (!fs.existsSync(configDir) || args.firstRun) {
  await firstRun()
}

if (args.token) {
  const { github_token } = await inquirer.prompt([
    {
      type: 'password',
      mask: '*',
      name: 'github_token',
      message: 'GitHub PAT (skip)',
    },
  ])
  await saveToken(github_token)
}

dotenv.config()
dotenv.config({ path: path.join(configDir, '.env') })

let config
if (args.config) {
  config = await import(path.resolve(process.cwd(), args.config))
} else {
  config = await import(path.join(configDir, 'config.mjs'))
}
const template = args.user ? config.templateDefault : config.template

githubAPI.authenticate(process.env.github_token)
const stats = await githubAPI.fetch(args.user)

const output = renderer
  .options({
    colors: config.colors,
    symbols: config.symbols,
    meta: config.meta,
  })
  .render(template, stats)

// stop spinner

console.log(output)
console.log('')

if (args.debug) console.log({ args, stats, config, configDir })

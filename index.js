#!/usr/bin/env node

import os from 'os'
import fs from 'fs'
import path from 'path'

import dotenv from 'dotenv'

import yargs from './utils/yargs.js'
import githubAPI from './apis/github.js'
import firstRun from './utils/firstRun.js'
import renderer from './utils/renderer.js'

// start spinner

const args = yargs(process.argv)

const configDir = path.join(os.homedir(), '.userfetch/')
if (!fs.existsSync(configDir) || args.firstRun) {
  await firstRun()
}

dotenv.config()
dotenv.config({ path: path.join(configDir, '.env') })

githubAPI.authenticate(process.env.github_token)
const stats = await githubAPI.fetch(args.user)

const config = await import(path.join(configDir, 'config.mjs'))
const template = args.user ? config.templateDefault : config.template

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

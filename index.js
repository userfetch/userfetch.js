#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

import ora from 'ora'
import dotenv from 'dotenv'

import { parseArgs } from './utils/yargs.js'
import * as githubAPI from './apis/github.js'
import { firstRun } from './utils/firstRun.js'
import { renderer } from './renderer/terminal.js'
import { getAndSaveToken } from './utils/getAndSaveToken.js'
import { CONFIG_DIR, PROJ_ROOT, CWD } from './utils/constants.js'

const args = parseArgs(process.argv)
const spinner = ora({ spinner: 'line', color: 'gray' }).start()

if (!args.ci) {
  spinner.stop()
  if (!fs.existsSync(CONFIG_DIR) || args.firstRun) await firstRun()
  if (args.token && !args.firstRun) await getAndSaveToken()
  spinner.start()
  dotenv.config()
  dotenv.config({ path: path.join(CONFIG_DIR, '.env') })
}

let config = {}
if (args.config) config = await import(path.resolve(CWD, args.config))
else if (!args.ci) config = await import(path.join(CONFIG_DIR, 'config.mjs'))
const template = args.user ? config.templateDefault : config.template

githubAPI.authenticate(process.env.github_token)
const githubStats = await githubAPI.fetch(args.user)

const output = renderer
  .options({
    colors: config.colors,
    symbols: config.symbols,
    meta: config.meta,
  })
  .render(template, githubStats)

spinner.stop()
console.log(output, '\n')
if (args.debug) console.log({ args, stats, config, CONFIG_DIR, PROJ_ROOT })

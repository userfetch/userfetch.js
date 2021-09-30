#!/usr/bin/env node

import os from 'os'
import fs from 'fs'
import path from 'path'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import dotenv from 'dotenv'

import columnify from 'columnify'

import firstRun from './utils/firstRun.js'
import renderer from './utils/renderer.js'
import githubAPI from './apis/github.js'

// start spinner

const args = yargs(hideBin(process.argv))
  .option('user', {
    alias: 'u',
    describe: 'Github username to fetch',
    type: 'string',
  })
  .option('config', {
    alias: 'c',
    describe: 'Path to config.mjs file',
    type: 'string',
  })
  .option('svg', {
    alias: 's',
    describe: 'Path to save the generated SVG to',
    type: 'string',
  })
  .option('no-color', {
    alias: 'nocolor',
    describe: 'Disable colored output',
    type: 'boolean',
    default: false,
  })
  .option('debug', {
    alias: 'd',
    describe: 'Show additional debugging output',
    type: 'boolean',
    default: false,
  })
  .option('first-run', {
    alias: 'firstrun',
    describe:
      'Trigger the firstrun script.\nWARNING: This will overwrite your config directory',
    type: 'boolean',
    default: false,
  })
  .help()
  .alias({
    help: 'h',
    version: 'v',
  })
  .parse()

const configDir = path.resolve(os.homedir(), '.userfetch/')
if (!fs.existsSync(configDir) || args.firstRun) {
  await firstRun()
}

dotenv.config()
dotenv.config({ path: path.resolve(configDir, '.env') })

githubAPI.authenticate(process.env.github_token)
const stats = await githubAPI.fetch(args.user)

const config = await import(path.resolve(configDir, 'config.mjs'))
const template = args.user ? config.templateDefault : config.template

const output = renderer
  .options({
    colors: config.colors,
    symbols: config.symbols,
    meta: config.meta,
  })
  .render(template, stats)

// stop spinner

console.log(
  columnify(
    [
      {
        left: output.left,
        right: output.right,
      },
    ],
    {
      columnSplitter: config.symbols.columnSeparator,
      preserveNewLines: true,
      showHeaders: false,
    }
  )
)
console.log('')

if (args.debug) console.log({ args, stats, config, configDir })

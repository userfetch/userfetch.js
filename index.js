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

const args = yargs(hideBin(process.argv)).parse()

const configDir = path.resolve(os.homedir(), '.userfetch/')
if (!fs.existsSync(configDir) || args.firstrun) {
  await firstRun()
  process.exit(0)
}

dotenv.config()
dotenv.config({ path: path.resolve(configDir, '.env') })

githubAPI.authenticate(process.env.github_token)
const stats = await githubAPI.fetch(args.user)

const config = await import(path.resolve(configDir, 'config.mjs'));
const render = args.user ? config.renderDefault : config.render

renderer.options({ colors: config.colors, symbols: config.symbols })

render(renderer, stats)
const output = renderer.output()

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
      columnSplitter: '   ',
      preserveNewLines: true,
      showHeaders: false,
      config: {
        right: {
          maxWidth: 60,
        },
      },
    }
  )
)
console.log('')

if (args.debug) console.log(stats)

// TODO
//  - title("")
//  - info("", "")
//  - underline()
//  x bar("", 0)
//  - list("", [""])
//  - left()
//  - right()
//  * raw(``)
//  - text("")
//  x multitext("")
//  x command("", "")

// TODO
// cli:
//  x --token="ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
//  - --user="octocat"
//  * --config="./path/to/config.js"
//  x --ascii="./path/to/ascii"

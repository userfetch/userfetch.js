#!/usr/bin/env node

import os from 'os'
import fs from 'fs'
import path from 'path'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import dotenv from 'dotenv'

import columnify from 'columnify'

import firstRun from './firstRun.js'
import { render } from './config.js'
import renderer from './renderUtils.js'
import githubAPI from './apis/github.js'

const args = yargs(hideBin(process.argv)).parse()

const configDir = path.resolve(os.homedir(), '.userfetch/')
if (!fs.existsSync(configDir) || args.debug) await firstRun()

dotenv.config()
dotenv.config({ path: path.resolve(configDir, '.env') })

githubAPI.authenticate(process.env.github_token)
const stats = await githubAPI.fetch(args.user)

render(renderer, stats)
const output = renderer.output()

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
    }
  )
)
console.log('')

// TODO
//  - title("")
//  - info("", "")
//  - underline()
//  x meter("", 0)
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

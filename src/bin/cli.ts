#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

import ora from 'ora'
import dotenv from 'dotenv'

import { main } from '../index.js'
import { parseArgs } from '../utils/yargs.js'
import { firstRun } from '../utils/firstRun.js'
import { getAndSaveToken } from '../utils/getAndSaveToken.js'
import { CONFIG_DIR, PROJ_ROOT, CWD } from '../utils/constants.js'

;(async () => {
  const args = await parseArgs(process.argv)
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

  let output = await main(args, process.env, config)
  spinner.stop()
  console.log(output)

  if (args.debug) console.log({ args, config, CONFIG_DIR, PROJ_ROOT })
})()
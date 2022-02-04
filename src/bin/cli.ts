#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

import ora from 'ora'
import dotenv from 'dotenv'

import { main } from '../index.js'
import { parseArgs } from '../utils/yargs.js'
import { firstRun } from '../utils/firstRun.js'
import { renderer as SVGRenderer } from '../renderer/svg.js'
import { getAndSaveToken } from '../utils/getAndSaveToken.js'
import { VERSION, CONFIG_DIR, PROJ_ROOT, CWD } from '../utils/constants.js'

import type { IConfigPartial } from '../config.js'

;(async () => {
  const args = await parseArgs(process.argv)
  const spinner = ora({ spinner: 'line', color: 'gray' }).start()

  if (!args.ci) {
    spinner.stop()
    if (!fs.existsSync(CONFIG_DIR) || args.firstRun) await firstRun()
    if (args.token && !args.firstRun) await getAndSaveToken()
    spinner.start()
    dotenv.config()
    dotenv.config({ path: path.join(CWD, '.env') })
    dotenv.config({ path: path.join(CONFIG_DIR, '.env') })
  }

  let configPath = ''
  if (args.config) {
    configPath = path.resolve(CWD, args.config)
    if (!args.config.endsWith('.mjs'))
      configPath = path.join(configPath, 'config.mjs')
  } else if (!args.ci) {
    configPath = path.join(CONFIG_DIR, 'config.mjs')
  }
  const config: IConfigPartial = await import(configPath)

  let { output, debugInfo } = await main(args, process.env, config)
  spinner.stop()
  console.log(output.text)

  spinner.start()
  if (args.svg) await SVGRenderer.save(output.svg, args.svg)
  spinner.stop()

  if (args.debug)
    console.log({ VERSION, CONFIG_DIR, PROJ_ROOT, CWD, configPath, config, args, ...debugInfo})
})()

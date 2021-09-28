import fs from 'fs'
import os from 'os'
import path from 'path'
import chalk from 'chalk'
import dotenv from 'dotenv'
import columnify from 'columnify'
import { render } from './config.js'
import renderer from './renderUtils.js'
import githubAPI from './apis/github.js'

const configDir = path.resolve(os.homedir(), '.userfetch/')
dotenv.config()
dotenv.config({ path: path.resolve(configDir, '.env') })

githubAPI.authenticate(process.env.github_token)
const stats = await githubAPI.fetch('octocat')

const ascii = fs.readFileSync('./ascii')

render(renderer, stats)
console.log(
  columnify(
    [
      {
        left: chalk.blue.bold(ascii.toString().replace(/^/gm, '\u2063')), // https://github.com/timoxley/columnify/issues/45#issuecomment-350343321
        right: renderer.output(),
      },
    ],
    {
      columnSplitter: '   ',
      preserveNewLines: true,
      showHeaders: false,
    }
  )
)

// TODO
// title("")
// info("", "")
// underline()
// meter("", 0)
// list("", [""])
// left()
// right()
// raw("", [""])
// text("")
// multitext("")
// command("", "")

// TODO
// cli:
// --token="ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
// --user="octocat"
// --config="./path/to/config.js"
// --ascii="./path/to/ascii"

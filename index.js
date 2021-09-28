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
// --user="octocat"
//  x --config="./path/to/config.js"
//  x --ascii="./path/to/ascii"

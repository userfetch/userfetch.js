import githubAPI from './apis/github.js'
import termkit from 'terminal-kit'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const term = termkit.terminal

let stats = await githubAPI(process.env.github_token)()

console.log(stats)

term.hideCursor(true)
const cursorPos = await term.getCursorLocation()
cursorPos.x += 5
function info(key, value) {
  term.moveTo(cursorPos.x, cursorPos.y)
  term.brightGreen.bold(key)(': ')(value)
  ++cursorPos.y
}
function title(value) {
  term.moveTo(cursorPos.x, cursorPos.y)
  term.brightGreen.bold(value)
  ++cursorPos.y
}
function underline() {
  term.moveTo(cursorPos.x, cursorPos.y)
  term('------')
  ++cursorPos.y
}
title('title')
underline()
info('name1', 'aryan')
info('name2', 'aryan')
info('name3', 'aryan')
info('name4', 'aryan')
info('name5', 'aryan')
info('name6', 'aryan')
info('name7', 'aryan')
info('name8', 'aryan')
console.log('')
term.hideCursor(false)

// const asciiart = fs.readFileSync('./ascii')

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

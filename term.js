import termkit from 'terminal-kit'
import fs from 'fs'
import { render, colors } from './config.js'
import termUtils from './termUtils.js'

const term = termkit.terminal

const asciiart = fs.readFileSync('./ascii')

term.hideCursor(true)

term[colors.primary].bold(asciiart.toString().replaceAll('^', '^^'))

term.move(3, 0)

render({ ...term, ...termUtils(term) }, {})

// render({ ...term, info, title, underline, blank }, stats)
console.log(
  asciiart
    .toString()
    .split('\n')
    .map((x) => x.length)
)

console.log('')
term.hideCursor(false)

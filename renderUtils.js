import fs from 'fs'
import url from 'url'
import path from 'path'

import chalk from 'chalk'
import stripAnsi from 'strip-ansi'

// FIXME internal, undicumented
import chalkTemplate from 'chalk/source/templates.js'

const Colors = {
  primary: 'blueBright',
  secondary: 'white',
  tertiary: 'gray',
  alternate: 'whiteBright',
}

const Symbols = {
  underline: '-',
  infoSeparator: ':',
  listMarker: '-',
}

const color = (colorStr) => chalk[colorStr || 'reset'] || chalk.reset

let column = 'left'
let result = {
  left: '',
  right: '',
}

export default {
  left: function () {
    column = 'left'
    return this
  },

  right: function () {
    column = 'right'
    return this
  },

  ascii: function (configPath, filePath) {
    const dirname = path.dirname(url.fileURLToPath(configPath))
    filePath = path.resolve(dirname, filePath)
    const ascii = fs.readFileSync(filePath)
    result[column] += color(Colors.alternate)(ascii.toString()) + '\n'
    return this
  },

  title: function (value) {
    result[column] += color(Colors.primary).bold(value) + '\n'
    return this
  },

  underline: function () {
    const last = stripAnsi(result[column]).trim().split('\n').slice(-1)[0]
    const uline = new Array(last.length).fill(Symbols.underline).join('')
    result[column] += color(Colors.tertiary)(uline) + '\n'
    return this
  },

  info: function (key, value) {
    result[column] +=
      color(Colors.primary).bold(key) +
      color(Colors.tertiary)(Symbols.infoSeparator + ' ') +
      color(Colors.secondary)(value) +
      '\n'
    return this
  },

  list: function (key, values) {
    result[column] +=
      color(Colors.primary).bold(key) +
      color(Colors.tertiary)(Symbols.infoSeparator + ' ') +
      '\n'
    values.forEach((value) => {
      result[column] +=
        color(Colors.tertiary)('  ' + Symbols.listMarker + ' ') +
        color(Colors.secondary)(value) +
        '\n'
    })
    return this
  },

  text: function (str) {
    result[column] += color(Colors.secondary)(str) + '\n'
    return this
  },

  blank: function () {
    result[column] += '\n'
    return this
  },

  raw: function (str) {
    result[column] += chalkTemplate(chalk, str) + '\n'
    return this
  },

  options: ({colors, symbols}) => {
    Object.assign(Colors, colors)
    Object.assign(Symbols, symbols)
  },

  clear: () => {
    result.left = ''
    result.right = ''
    column = 'left'
  },

  output: () => {
    return {
      left: result.left.replace(/\s+$/, ''),
      right: result.right.replace(/\s+$/, ''),
    }
  },
}

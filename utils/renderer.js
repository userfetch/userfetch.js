import fs from 'fs'
import url from 'url'
import path from 'path'

import chalk from 'chalk'
import wrapAnsi from 'wrap-ansi'
import stripAnsi from 'strip-ansi'

import columnify from 'columnify'

import chalkTemplate from './chalkTemplate.js'


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
  columnSeparator: '   ',
}

const Meta = {
  maxWidth: 60,
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
    result[column] +=
      wrapAnsi(color(Colors.secondary)(str), Meta.maxWidth) + '\n'
    return this
  },

  blank: function () {
    result[column] += '\n'
    return this
  },

  raw: function (str) {
    result[column] += wrapAnsi(chalkTemplate(str), Meta.maxWidth) + '\n'
    return this
  },

  options: function ({ colors = {}, symbols = {}, meta = {} }) {
    Object.assign(Colors, colors)
    Object.assign(Symbols, symbols)
    Object.assign(Meta, meta)
    return this
  },

  clear: function () {
    result.left = ''
    result.right = ''
    column = 'left'
    return this
  },

  output: function () {
    let leftCol = result.left.replace(/\s+$/, '')
    let rightCol = result.right.replace(/\s+$/, '')
    let fullOutp = columnify(
      [
        {
          left: leftCol,
          right: rightCol,
        },
      ],
      {
        columnSplitter: Symbols.columnSeparator,
        preserveNewLines: true,
        showHeaders: false,
      }
    )
    return fullOutp
  },

  render: function (template, data) {
    this.clear()
    template(this, data)
    return this.output()
  },
}

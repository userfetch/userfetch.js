import fs from 'fs'
import url from 'url'
import path from 'path'
import chalk from 'chalk'
import stripAnsi from 'strip-ansi'
import { colors } from './config.js'

// FIXME internal, undicumented
import chalkTemplate from 'chalk/source/templates.js'

const n = chalk.reset
const p = chalk[colors.primary || 'reset'] || n
const s = chalk[colors.secondary || 'reset'] || n
const t = chalk[colors.tertiary || 'reset'] || n
const a = chalk[colors.alternate || 'reset'] || n

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

  ascii: function (filePath) {
    const dirname = path.dirname(url.fileURLToPath(import.meta.url))
    filePath = path.resolve(dirname, filePath)
    const ascii = fs.readFileSync(filePath)
    result[column] += a(ascii.toString()) + n('\n')
    return this
  },

  title: function (value) {
    result[column] += p.bold(value) + n('\n')
    return this
  },

  underline: function () {
    const last = stripAnsi(result[column]).split('\n').slice(-2)[0]
    const uline = new Array(last.length).fill('-').join('')
    result[column] += t(uline) + n('\n')
    return this
  },

  info: function (key, value) {
    result[column] += p.bold(key) + t(': ') + s(value) + n('\n')
    return this
  },

  list: function (key, values) {
    result[column] += p.bold(key) + t(': ') + n('\n')
    values.forEach((value) => {
      result[column] += t('  - ') + s(value) + n('\n')
    })
    return this
  },

  text: function (str) {
    result[column] += n(str) + n('\n')
    return this
  },

  blank: function () {
    result[column] += n('\n')
    return this
  },

  raw: function (str) {
    result[column] += chalkTemplate(chalk, str) + n('\n')
    return this
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

import chalk from 'chalk'
import { colors } from './config.js'

// FIXME internal, undicumented
import chalkTemplate from 'chalk/source/templates.js'

const n = chalk.reset
const p = chalk[colors.primary || 'reset'] || n
const s = chalk[colors.secondary || 'reset'] || n
const t = chalk[colors.tertiary || 'reset'] || n
const a = chalk[colors.alternate || 'reset'] || n

let result = ''

export default {
  info: (key, value) => {
    result += p.bold(key) + t(': ') + s(value) + n('\n')
  },

  title: (value) => {
    result += p.bold(value) + n('\n')
  },

  underline: () => {
    result += t('----') + n('\n')
  },

  blank: () => {
    result += n('\n')
  },

  raw: (str) => {
    result += chalkTemplate(chalk, str)
  },

  clear: () => result = "",
  output: () => result.trim(),
}

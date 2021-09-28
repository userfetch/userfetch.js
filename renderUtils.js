import chalk from 'chalk'
import { colors } from './config.js'

p = chalk[colors.primary || 'reset']
s = chalk[colors.secondary || 'reset']
t = chalk[colors.tertiary || 'reset']
a = chalk[colors.alternate || 'reset']
n = chalk.reset

export default {
  info: (key, value) => {
    p.bold(key)
    t(': ')
    s(value)
    n('\n')
  },

  title: (value) => {
    p.bold(value)
    n('\n')
  },

  underline: () => {
    t('----')
    n('\n')
  },

  blank: () => {
    n('\n')
  },
}

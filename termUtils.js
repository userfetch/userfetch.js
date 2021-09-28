import { colors } from './config.js'

export default function (term) {
  return {
    info: (key, value) => {
      term[colors.primary].bold(key)
      term[colors.tertiary](': ')
      term[colors.secondary](value)
      term[colors.tertiary]('\n')
    },

    title: (value) => {
      term[colors.primary].bold(value)
      term[colors.tertiary]('\n')
    },

    underline: () => {
      term[colors.tertiary]('----')
      term[colors.tertiary]('\n')
    },

    blank: () => {
      term[colors.tertiary]('\n')
    },
  }
}

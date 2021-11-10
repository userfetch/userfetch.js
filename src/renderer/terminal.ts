import chalk from 'chalk'
import wrapAnsi from 'wrap-ansi'
import stripAnsi from 'strip-ansi'
import { table, getBorderCharacters } from 'table'

import { getASCII } from '../utils/getASCII.js'
import { chalkTemplate } from '../utils/chalkTemplate.js'
import { LINESTART_RE_GM, ZERO_WIDTH_SPACE } from '../utils/constants.js'
import { colors as Colors, symbols as Symbols, meta as Meta } from '../stubs/config.mjs'

const color = (colorStr) => chalk[colorStr || 'reset'] || chalk.reset

let column = 'left'
let result = {
  left: '',
  right: '',
  top: '',
  bottom: '',
}

export const renderer = {
  left: function () {
    column = 'left'
    return this
  },

  right: function () {
    column = 'right'
    return this
  },

  top: function () {
    column = 'top'
    return this
  },

  bottom: function () {
    column = 'bottom'
    return this
  },

  ascii: function (configPath, filePath) {
    const ascii = getASCII(configPath, filePath)
    result[column] += color(Colors.alternate)(ascii.toString()) + '\n'
    return this
  },

  title: function (value) {
    result[column] += color(Colors.primary).bold(value) + '\n'
    return this
  },

  underline: function () {
    const last = stripAnsi(result[column]).trim().split('\n').slice(-1)[0]
    const uline = Symbols.underline.repeat(last.length)
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
        ZERO_WIDTH_SPACE +
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
    result[column] += ZERO_WIDTH_SPACE + '\n'
    return this
  },

  raw: function (str) {
    result[column] += chalkTemplate(str) + '\n'
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
    result.top = ''
    result.bottom = ''
    column = 'left'
    return this
  },

  output: function () {
    let tableConfig = {
      border: Object.assign(getBorderCharacters('void'), {
        bodyJoin: Symbols.columnSeparator,
      }),
      columns: [
        {
          paddingLeft: Meta.paddingLeft,
          paddingRight: 0,
        },
        {
          paddingLeft: 0,
          paddingRight: 0,
        },
      ],
    }
    let header = table(
      [[wrapAnsi(result.top, 2 * Meta.maxWidth)]],
      tableConfig
    )
    let middle = table(
      [
        [
          wrapAnsi(result.left, Meta.maxWidth),
          wrapAnsi(result.right, Meta.maxWidth),
        ],
      ],
      tableConfig
    )
    let footer = table(
      [[wrapAnsi(result.bottom, 2 * Meta.maxWidth)]],
      tableConfig
    )
    return [
      '\n'.repeat(Meta.paddingTop),
      result.top && (header.trimEnd().replace(LINESTART_RE_GM, ZERO_WIDTH_SPACE) + '\n'),
      middle.trimEnd(),
      result.bottom && ('\n' + footer.trimEnd().replace(LINESTART_RE_GM, ZERO_WIDTH_SPACE)),
      '\n'.repeat(Meta.paddingBottom),
    ].join('')
  },

  render: function (template, data) {
    this.clear()
    template(this, data)
    return this.output()
  },
}

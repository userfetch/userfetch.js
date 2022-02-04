import chalk, { ForegroundColor } from 'chalk'
import wrapAnsi from 'wrap-ansi'
import stripAnsi from 'strip-ansi'
import { table, getBorderCharacters } from 'table'

import { getASCII } from '../utils/getASCII.js'
import { chalkTemplate } from '../utils/chalkTemplate.js'
import { LINESTART_RE_GM, ZERO_WIDTH_SPACE } from '../utils/constants.js'
import { textOptions as DefautlTextOptions } from '../../stubs/config.mjs'

import type { ITextOptions, ITextOptionsPartial } from '../config.js'

const textOptions = DefautlTextOptions as ITextOptions

const color = (colorStr: typeof ForegroundColor | 'reset') => chalk[colorStr]

type columnType = 'left' | 'right' | 'top' | 'bottom' | 'prompt'

let column: columnType = 'left'
let result: Record<columnType, string> = {
  prompt: '',
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

  ascii: function (configPath: string, filePath: string) {
    const ascii = getASCII(configPath, filePath)
    result[column] +=
      color(textOptions.theme.text)(ascii.toString()) + '\n'
    return this
  },

  title: function (value: string) {
    result[column] += color(textOptions.theme.title).bold(value) + '\n'
    return this
  },

  underline: function () {
    const last = stripAnsi(result[column]).trim().split('\n').slice(-1)[0]
    const uline = textOptions.symbols.underline.repeat(last.length)
    result[column] += color(textOptions.theme.symbol)(uline) + '\n'
    return this
  },

  info: function (key: string, value: string) {
    result[column] +=
      color(textOptions.theme.key).bold(key) +
      color(textOptions.theme.symbol)(
        textOptions.symbols.infoSeparator + ' '
      ) +
      color(textOptions.theme.text)(value) +
      '\n'
    return this
  },

  list: function (key: string, values: string[]) {
    result[column] +=
      color(textOptions.theme.key).bold(key) +
      color(textOptions.theme.symbol)(
        textOptions.symbols.infoSeparator + ' '
      ) +
      '\n'
    values.forEach((value) => {
      result[column] +=
        ZERO_WIDTH_SPACE +
        color(textOptions.theme.symbol)(
          '  ' + textOptions.symbols.listMarker + ' '
        ) +
        color(textOptions.theme.text)(value) +
        '\n'
    })
    return this
  },

  text: function (str: string) {
    result[column] += color(textOptions.theme.text)(str) + '\n'
    return this
  },

  blank: function () {
    result[column] += ZERO_WIDTH_SPACE + '\n'
    return this
  },

  raw: function (str: string) {
    result[column] += chalkTemplate(str) + '\n'
    return this
  },

  prompt: function ({user, dir, cmd}: {user?: string, dir?: string, cmd: string}) {
    result.prompt = chalkTemplate(`{white ${user?`{red ${user}}:`:``}{blue ${dir??'~'}}$ ${cmd}}`)
    return this
  },

  options: function (options?: ITextOptionsPartial) {
    // FIXME: deep merge
    const themeOpt = Object.assign({}, textOptions.theme, options?.theme)
    const symOpt = Object.assign({}, textOptions.symbols, options?.symbols)
    Object.assign(textOptions, options, {
      theme: themeOpt,
      symbols: symOpt,
    } as ITextOptionsPartial)
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
        bodyJoin: textOptions.symbols.columnSeparator,
      }),
      columns: [
        {
          paddingLeft: textOptions.paddingLeft,
          paddingRight: 0,
        },
        {
          paddingLeft: 0,
          paddingRight: 0,
        },
      ],
    }
    let header = table(
      [[wrapAnsi(result.top, 2 * textOptions.maxWidth)]],
      tableConfig
    )
    let middle = table(
      [
        [
          wrapAnsi(result.left, textOptions.maxWidth),
          wrapAnsi(result.right, textOptions.maxWidth),
        ],
      ],
      tableConfig
    )
    let footer = table(
      [[wrapAnsi(result.bottom, 2 * textOptions.maxWidth)]],
      tableConfig
    )
    return [
      result.prompt?result.prompt+'\n':'',
      '\n'.repeat(textOptions.paddingTop),
      result.top &&
        header.trimEnd().replace(LINESTART_RE_GM, ZERO_WIDTH_SPACE) + '\n',
      middle.trimEnd(),
      result.bottom &&
        '\n' + footer.trimEnd().replace(LINESTART_RE_GM, ZERO_WIDTH_SPACE),
      '\n'.repeat(textOptions.paddingBottom),
    ].join('')
  },

  // TODO: remove any
  render: function (template: Function, data: any) {
    this.clear()
    template(this, data)
    return this.output()
  },
}

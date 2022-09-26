import { ForegroundColor } from 'chalk'
import type { PartialDeep } from 'type-fest'

type CSSColor = string

export interface ITheme {
  title: typeof ForegroundColor
  key: typeof ForegroundColor
  text: typeof ForegroundColor
  symbol: typeof ForegroundColor
}

export interface ISymbols {
  underline: string
  infoSeparator: string
  listMarker: string
  columnSeparator: string
}

export interface IColors {
  backgroundColor: CSSColor
  foregroundColor: CSSColor
  black: CSSColor
  red: CSSColor
  green: CSSColor
  yellow: CSSColor
  blue: CSSColor
  magenta: CSSColor
  cyan: CSSColor
  white: CSSColor
  blackBright: CSSColor
  redBright: CSSColor
  greenBright: CSSColor
  yellowBright: CSSColor
  blueBright: CSSColor
  magentaBright: CSSColor
  cyanBright: CSSColor
  whiteBright: CSSColor
}

export interface ITextOptions {
  theme: ITheme
  symbols: ISymbols
  paddingLeft: number
  paddingTop: number
  paddingBottom: number
  maxWidth: number
}

export interface ISVGOptions {
  colors: IColors
  rows: number
  cols: number
  paddingX: number
  paddingY: number
  radius: number
  fontSize: number
  lineHeight: number
  animationDuration: number
}

export type ITextOptionsPartial = PartialDeep<ITextOptions>
export type ISVGOptionsPartial = PartialDeep<ISVGOptions>
export interface IConfigPartial {
  template: Function
  templateDefault: Function
  textOptions?: ITextOptionsPartial
  svgOptions?: ISVGOptionsPartial
}
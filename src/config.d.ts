import { ForegroundColor } from 'chalk'
import type { PartialDeep } from 'type-fest'

export interface ITheme {
  primary: typeof ForegroundColor
  secondary: typeof ForegroundColor
  tertiary: typeof ForegroundColor
  alternate: typeof ForegroundColor
}

export interface ISymbols {
  underline: string
  infoSeparator: string
  listMarker: string
  columnSeparator: string
}

export interface IColors {
  backgroundColor: string
  foregroundColor: string
  black: string
  red: string
  green: string
  yellow: string
  blue: string
  magenta: string
  cyan: string
  white: string
  blackBright: string
  redBright: string
  greenBright: string
  yellowBright: string
  blueBright: string
  magentaBright: string
  cyanBright: string
  whiteBright: string
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
}

export type ITextOptionsPartial = PartialDeep<ITextOptions>
export type ISVGOptionsPartial = PartialDeep<ISVGOptions>
export interface IConfigPartial {
  template: Function
  templateDefault: Function
  textOptions?: ITextOptionsPartial
  svgOptions?: ISVGOptionsPartial
}
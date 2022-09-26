declare module '*config.mjs' {
  import type { ITextOptions, ISVGOptions } from './config.d.ts'
  export const template: Function
  export const templateDefault: Function
  export const textOptions: ITextOptions
  export const svgOptions: ISVGOptions
}

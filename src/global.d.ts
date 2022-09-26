declare module '*config.mjs' {
  export const template: Function
  export const templateDefault: Function

  export const colors: {
    primary: string
    secondary: string
    tertiary: string
    alternate: string
  }
  export const meta: {
    paddingLeft: number
    paddingTop: number
    paddingBottom: number
    maxWidth: number
  }
  export const symbols: {
    underline: string
    infoSeparator: string
    listMarker: string
    columnSeparator: string
  }
  export const svgOptions: {
    colors: {
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
    rows: number
    cols: number
    paddingX: number
    paddingY: number
    radius: number
    fontSize: number
    lineHeight: number
    animationDuration: number
  }
}

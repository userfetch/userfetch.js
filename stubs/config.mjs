export function template({ left, right, top, bottom, ascii, title, underline, info, list, text, blank, raw }, data) {
  left()
  ascii(import.meta.url, './ascii')
  right()
  title(data.username)
  underline()
  if (data.bio) text(data.bio)
  blank()
  info('repos', data.repositories)
  info('followers', data.followers)
}

export function templateDefault(t, data) {
  t.left()
    .ascii(import.meta.url, './ascii')
    .right()
    .title(data.username)
    .underline()
  if (data.bio) t.text(data.bio)
  t.blank()
    .info('repos', data.repositories)
    .info('followers', data.followers)
}

export const symbols = {
  underline: '-',
  infoSeparator: ':',
  listMarker: '-',
  columnSeparator: '   ',
}

export const colors = {
  primary: 'blueBright',
  secondary: 'white',
  tertiary: 'gray',
  alternate: 'whiteBright',
}

export const meta = {
  paddingLeft: 0,
  paddingTop: 0,
  paddingBottom: 1,
  maxWidth: 40,
}

export const svgOptions = {
  colors: {
    backgroundColor: '#18181b',
    foregroundColor: '#fcfcfc',
    black: '#232627',
    red: '#ef4444',
    green: '#22c55e',
    yellow: '#eab308',
    blue: '#3b82f6',
    magenta: '#d946ef',
    cyan: '#06b6d4',
    white: '#f5f5f5',
    blackBright: '#7f8c8d',
    redBright: '#f87171',
    greenBright: '#4ade80',
    yellowBright: '#fde047',
    blueBright: '#60a5fa',
    magentaBright: '#e879f9',
    cyanBright: '#22d3ee',
    whiteBright: '#ffffff',
  },
  rows: 16,
  cols: 80,
  paddingX: 20,
  paddingY: 15,
  radius: 6,
}

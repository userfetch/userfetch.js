export function render(t, vars) {
  t.left()
    .ascii(import.meta.url, './ascii')
    .right()
    .title(vars.username)
    .underline()
  if (vars.bio) t.text(vars.bio)
  t.blank()
    .info('repos', vars.repositories)
    .info('followers', vars.followers)
}

export function renderDefault(t, vars) {
  t.left()
    .ascii(import.meta.url, './ascii')
    .right()
    .title(vars.username)
    .underline()
  if (vars.bio) t.text(vars.bio)
  t.blank()
    .info('repos', vars.repositories)
    .info('followers', vars.followers)
}

export const symbols = {
  underline: '-',
  infoSeparator: ':',
  listMarker: '-',
}

export const colors = {
  primary: 'blueBright',
  secondary: 'white',
  tertiary: 'gray',
  alternate: 'whiteBright',
}

export const terminal = {
  background: '#afafaf',
  black: '#232628',
  red: '#fc4384',
  green: '#b3e33b',
  yellow: '#ffa727',
  blue: '#75dff2',
  magenta: '#ae89fe',
  cyan: '#708387',
  white: '#d5d5d0',
  blackBright: '#626566',
  redBright: '#ff7fac',
  greenBright: '#c8ed71',
  yellowBright: '#ebdf86',
  blueBright: '#75dff2',
  magentaBright: '#ae89fe',
  cyanBright: '#b1c6ca',
  whiteBright: '#f9f9f4',
}

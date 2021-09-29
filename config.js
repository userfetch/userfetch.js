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
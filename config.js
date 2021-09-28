export function render(t, vars) {
  t.title(vars.username)
  t.underline()
  t.info('name', vars.name)
  t.info('email', vars.email)
  t.blank()
  t.info('repos', vars.repositories)
  t.info('followers', vars.followers)
  t.blank()
  t.raw(`{yellow ${vars.starred} stars} given!`)
}

export const colors = {
  primary: 'blueBright',
  secondary: 'white',
  tertiary: 'gray',
  alternate: 'white',
}

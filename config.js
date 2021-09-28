export function render(t, vars) {
  t.title(vars.login)
  t.underline()
  t.info('name', vars.name)
  t.info('email', vars.email)
  t.blank()
  t.info('repos', vars.repositories)
  t.info('followers', vars.followers)
}

export const colors = {
  primary: 'blueBright',
  secondary: 'white',
  tertiary: 'gray',
  alternate: 'white',
}

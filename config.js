export function render(t, vars) {
  t.left()
    .ascii('./ascii')
    .right()
    .title(vars.username)
    .underline()
    .text('hello world\na short description\n:)')
    .blank()
    .info('name', vars.name)
    .info('email', vars.email)
    .blank()
    .info('repos', vars.repositories)
    .info('followers', vars.followers)
    .blank()
    .raw(`{yellow ${vars.starred} stars} given!`)
    .blank()
    .list("I like", ['trains', 'TRAAIIINNS!!'])
}

export const colors = {
  primary: 'blueBright',
  secondary: 'white',
  tertiary: 'gray',
  alternate: 'white',
}

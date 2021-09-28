export function render(term, variables) {
  term.title('title')
  term.underline()
  term.info('name1', variables.email)
  term.info('name2', 'aryan')
  term.blank()
  term.info('name3', 'aryan')
  term.info('name4', 'aryan')
}

export const colors = {
  primary: 'brightGreen',
  secondary: 'white',
  tertiary: 'gray',
}

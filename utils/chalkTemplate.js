import chalk from 'chalk'

/**
 * @see {@link https://github.com/chalk/chalk-template/issues/2#issue-999990227}
 *
 * @param {string} templateString
 * @returns {string}
 */
function chalkTemplate(templateString) {
  const template = [templateString]
  template.raw = [...template]
  return chalk(template)
}

export { chalkTemplate }

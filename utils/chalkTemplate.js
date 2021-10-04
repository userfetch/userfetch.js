import chalk from 'chalk'

// https://github.com/chalk/chalk-template/issues/2#issue-999990227
export default function (str) {
  const template = [str]
  template.raw = [...template]
  return chalk(template)
}

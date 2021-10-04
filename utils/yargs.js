import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export default function (args) {
  return yargs(hideBin(args))
    .option('user', {
      alias: 'u',
      describe: 'Github username to fetch',
      type: 'string',
    })
    .option('config', {
      alias: 'c',
      describe: 'Path to config.mjs file',
      type: 'string',
    })
    .option('svg', {
      alias: 's',
      describe: 'Path to save the generated SVG to',
      type: 'string',
    })
    .option('token', {
      alias: 't',
      describe: 'prompts Github PAT input',
      type: 'boolean',
      default: false,
    })
    .option('no-color', {
      alias: 'nocolor',
      describe: 'Disable colored output',
      type: 'boolean',
      default: false,
    })
    .option('debug', {
      alias: 'd',
      describe: 'Show additional debugging output',
      type: 'boolean',
      default: false,
    })
    .option('first-run', {
      alias: 'firstrun',
      describe:
        'Trigger the firstrun script. WARNING: This will overwrite your config directory',
      type: 'boolean',
      default: false,
    })
    .help()
    .alias({
      help: 'h',
      version: 'v',
    })
    .parse()
}

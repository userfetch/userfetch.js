import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { VERSION } from './constants.js'

export default function (args) {
  return yargs(hideBin(args))
    .option('user', {
      alias: 'u',
      describe: 'Github username to fetch',
      type: 'string',
      requiresArg: true,
    })
    .option('config', {
      alias: 'c',
      describe: 'Path to config.mjs file',
      type: 'string',
      normalize: true,
      requiresArg: true,
    })
    .option('svg', {
      alias: 's',
      describe: 'Path to save the generated SVG to',
      type: 'string',
      normalize: true,
      requiresArg: true,
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
    .option('ci', {
      describe:
        'continuous integration mode. Disables writing to and reading of config dir. Will require --config',
      type: 'boolean',
      default: false,
    })
    .check((argv, options) => {
      if (argv.ci && !argv.config)
        throw new Error('--config is required with --ci')
      return true
    })
    .help()
    .version(VERSION)
    .alias({
      help: 'h',
      version: 'v',
    })
    .parse()
}

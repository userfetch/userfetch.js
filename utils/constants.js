import os from 'os'
import url from 'url'
import path from 'path'
import module from 'module'

const require = module.createRequire(import.meta.url)
const pkg = require('../package.json')

export const NAME = pkg.name
export const VERSION = pkg.version
export const CONFIG_DIR = path.join(os.homedir(), '.userfetch/')
export const CWD = process.cwd()

/**
 * extract directory from fileURL
 * 
 * use to emulate __dirname in ES Modules
 * 
 * @example
 * ```
 * const __dirname = DIR(import.meta.url)
 * ```
 * 
 * @see {@link https://stackoverflow.com/a/69242626/11346540}
 * 
 * @param {string} fileUrl
 * @returns string
 */
export const DIR = (fileUrl) => path.dirname(url.fileURLToPath(fileUrl))

export const PROJ_ROOT = path.resolve(DIR(import.meta.url), '../')

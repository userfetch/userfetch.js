import os from 'os'
import path from 'path'
import module from 'module'
import url from 'url';

const req = module.createRequire(import.meta.url)
const pack = req('../../package.json')

export const __DIR = (fileurl: string | url.URL) => path.dirname(url.fileURLToPath(fileurl))

export const NAME = pack.name
export const CWD = process.cwd()
export const VERSION = pack.version
export const PROJ_ROOT = path.resolve(__DIR(import.meta.url), '../../')
export const CONFIG_DIR = path.join(os.homedir(), '.userfetch/')

export const LINESTART_RE_GM = /^/gm
export const ZERO_WIDTH_SPACE = '\u200b'

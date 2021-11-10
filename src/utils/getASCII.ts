import fs from 'fs'
import path from 'path'

import { DIR, LINESTART_RE_GM, ZERO_WIDTH_SPACE } from './constants.js'

function getASCII(configPath, filePath) {
  const dirname = DIR(configPath)
  filePath = path.resolve(dirname, filePath)
  const ascii = fs.readFileSync(filePath)
  return ascii.toString().replace(LINESTART_RE_GM, ZERO_WIDTH_SPACE) // prevents collapsing of leading whitespace
}

export { getASCII }

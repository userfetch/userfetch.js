import fs from 'fs'
import path from 'path'

import { __DIR, LINESTART_RE_GM, ZERO_WIDTH_SPACE } from './constants.js'

function getASCII(configPath, filePath) {
  filePath = path.resolve(__DIR(configPath), filePath)
  // TODO: error handling
  const ascii = fs.readFileSync(filePath)
  return ascii.toString().replace(LINESTART_RE_GM, ZERO_WIDTH_SPACE) // prevents collapsing of leading whitespace
}

export { getASCII }

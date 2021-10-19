import fs from 'fs'
import path from 'path'

import { DIR, EMPTY_CHAR } from './constants.js'

function getASCII(configPath, filePath) {
  const dirname = DIR(configPath)
  filePath = path.resolve(dirname, filePath)
  const ascii = fs.readFileSync(filePath)
  return ascii.toString().replaceAll(' ', EMPTY_CHAR) // prevents collapsing of leading whitespace
}

export { getASCII }

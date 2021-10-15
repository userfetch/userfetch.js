import fs from 'fs'
import path from 'path'

import { DIR } from './constants.js'

export default function (configPath, filePath) {
  const dirname = DIR(configPath)
  filePath = path.resolve(dirname, filePath)
  const ascii = fs.readFileSync(filePath)
  return ascii
}

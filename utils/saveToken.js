import os from 'os'
import fs from 'fs'
import path from 'path'

const envFile = path.join(os.homedir(), '.userfetch', '.env')

export default async function (ghtoken) {
  if (!ghtoken) return
  const data = `github_token=${ghtoken}`
  fs.promises.writeFile(envFile, data)
}

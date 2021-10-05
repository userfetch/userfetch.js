import os from 'os'
import fs from 'fs'
import path from 'path'

const envFile = path.join(os.homedir(), '.userfetch', '.env')

export default async function (github_token) {
  if (!github_token) return
  const data = `github_token=${github_token}`
  fs.promises.writeFile(envFile, data)
}

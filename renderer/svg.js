import fs from 'fs'
import path from 'path'

import Anser from 'anser'

import { CWD } from '../utils/constants.js'


function getSVGString(svgdata, svgcolors) {
  // template from: https://github.com/SNDST00M/SNDST00M
  return `<svg xmlns="http://www.w3.org/2000/svg">
  <foreignObject x="0" y="0" width="100%" height="100%">
    <pre xmlns="http://www.w3.org/1999/xhtml" style="width: auto;display: inline-block;background-color: #161b22;border-radius: 6px;box-sizing: border-box;color: #c9d1d9;font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;font-size: 13.6px;line-height: 19.72px;margin: 0;padding: 15px 20px;text-size-adjust: 100%;white-space: pre;-webkit-locale: 'en';">${svgdata}</pre>
  </foreignObject>
</svg>`
}

function getSVGPath(svgpath) {
  svgpath = path.resolve(CWD, svgpath)
  if (!svgpath.endsWith('.svg')) svgpath = path.resolve(svgpath, 'output.svg')
  let svgdir = path.dirname(svgpath)
  if (!fs.existsSync(svgdir)) fs.mkdirSync(svgdir)
  return svgpath
}

async function saveSVG(ansistr, config, svgpath) {
  let svgdata = Anser.ansiToHtml(ansistr, { use_classes: true })
  let svgstring = getSVGString(svgdata)
  svgpath = getSVGPath(svgpath)
  await fs.promises.writeFile(svgpath, svgstring)
}

export { saveSVG }

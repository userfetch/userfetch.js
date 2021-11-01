import fs from 'fs'
import path from 'path'

import ansitosvg from 'ansi-to-svg'

import { CWD } from '../utils/constants.js'

async function saveSVG(ansistr, config, svgpath) {
  let svgdata = ansitosvg(ansistr, {
    scale: 2,
    fontFace: 'Monospace',
    fontSize: 14,
    lineHeight: 18,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    colors: {...config},
  })
  svgpath = path.resolve(CWD, svgpath)
  if (!svgpath.endsWith('.svg')) svgpath = path.resolve(svgpath, 'output.svg')
  let svgdir = path.dirname(svgpath)
  if (!fs.existsSync(svgdir)) fs.mkdirSync(svgdir)
  await fs.promises.writeFile(svgpath, svgdata)
}

export { saveSVG }

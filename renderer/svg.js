import fs from 'fs'
import path from 'path'

import Anser from 'anser'

import { CWD } from '../utils/constants.js'

const Colors = {}

function getStyles() {
  return `
  .ansi-black-fg {
    color: ${Colors.black};
  }
  .ansi-red-fg {
    color: ${Colors.red};
  }
  .ansi-green-fg {
    color: ${Colors.green};
  }
  .ansi-yellow-fg {
    color: ${Colors.yellow};
  }
  .ansi-blue-fg {
    color: ${Colors.blue};
  }
  .ansi-magenta-fg {
    color: ${Colors.magenta};
  }
  .ansi-cyan-fg {
    color: ${Colors.cyan};
  }
  .ansi-white-fg {
    color: ${Colors.white};
  }
  .ansi-bright-black-fg {
    color: ${Colors.blackBright};
  }
  .ansi-bright-red-fg {
    color: ${Colors.redBright};
  }
  .ansi-bright-green-fg {
    color: ${Colors.greenBright};
  }
  .ansi-bright-yellow-fg {
    color: ${Colors.yellowBright};
  }
  .ansi-bright-blue-fg {
    color: ${Colors.blueBright};
  }
  .ansi-bright-magenta-fg {
    color: ${Colors.magentaBright};
  }
  .ansi-bright-cyan-fg {
    color: ${Colors.cyanBright};
  }
  .ansi-bright-white-fg {
    color: ${Colors.whiteBright};
  } 
  `
}

function getSVGString(svgdata) {
  // template from: https://github.com/SNDST00M/SNDST00M
  return `
  <svg xmlns="http://www.w3.org/2000/svg">
    <foreignObject x="0" y="0" width="100%" height="100%">
      <style>${getStyles()}</style>
      <pre xmlns="http://www.w3.org/1999/xhtml" style="width: auto;display: inline-block;background-color: ${Colors.backgroundColor};border-radius: 6px;box-sizing: border-box;color: ${Colors.foregroundColor};font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;font-size: 13.6px;line-height: 19.72px;margin: 0;padding: 15px 20px;text-size-adjust: 100%;white-space: pre;-webkit-locale: 'en';">${svgdata}</pre>
    </foreignObject>
  </svg>
  `
}

function getSVGPath(svgpath) {
  svgpath = path.resolve(CWD, svgpath)
  if (!svgpath.endsWith('.svg')) svgpath = path.resolve(svgpath, 'output.svg')
  let svgdir = path.dirname(svgpath)
  if (!fs.existsSync(svgdir)) fs.mkdirSync(svgdir)
  return svgpath
}

export const renderer = {
  options: function ({ colors = {} }) {
    Object.assign(Colors, colors)
    return this
  },
  render: function (ansistr) {
    let svgdata = Anser.ansiToHtml(ansistr, { use_classes: true })
    let svgstring = getSVGString(svgdata)
    return svgstring
  },
  save: async function (svggstr, svgpath) {
    svgpath = getSVGPath(svgpath)
    await fs.promises.writeFile(svgpath, svggstr)
  },
}

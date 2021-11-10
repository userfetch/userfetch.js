import fs from 'fs'
import path from 'path'

import Anser from 'anser'

import { CWD } from '../utils/constants.js'
import { svgOptions } from '../stubs/config.mjs'

function getStyles() {
  const {colors, ...rest} = svgOptions
  return `
  .ansi-black-fg {
    color: ${colors.black};
  }
  .ansi-red-fg {
    color: ${colors.red};
  }
  .ansi-green-fg {
    color: ${colors.green};
  }
  .ansi-yellow-fg {
    color: ${colors.yellow};
  }
  .ansi-blue-fg {
    color: ${colors.blue};
  }
  .ansi-magenta-fg {
    color: ${colors.magenta};
  }
  .ansi-cyan-fg {
    color: ${colors.cyan};
  }
  .ansi-white-fg {
    color: ${colors.white};
  }
  .ansi-bright-black-fg {
    color: ${colors.blackBright};
  }
  .ansi-bright-red-fg {
    color: ${colors.redBright};
  }
  .ansi-bright-green-fg {
    color: ${colors.greenBright};
  }
  .ansi-bright-yellow-fg {
    color: ${colors.yellowBright};
  }
  .ansi-bright-blue-fg {
    color: ${colors.blueBright};
  }
  .ansi-bright-magenta-fg {
    color: ${colors.magentaBright};
  }
  .ansi-bright-cyan-fg {
    color: ${colors.cyanBright};
  }
  .ansi-bright-white-fg {
    color: ${colors.whiteBright};
  }
  .ansi-bold {
    font-weight: bold;
  }
  #window {
    width: calc(${rest.cols}ch + ${2 * rest.paddingX}px);
    height: calc(${rest.rows * 19.72}px + ${2 * rest.paddingY}px - ${19.72-13.6}px);
  }
  #terminal {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: inline-block;
    margin: 0;
    padding: ${rest.paddingY}px ${rest.paddingX}px;
    border-radius: ${rest.radius}px;
    background-color: ${colors.backgroundColor};
    color: ${colors.foregroundColor};
    font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
    font-size: 13.6px;
    line-height: 19.72px;
    text-size-adjust: 100%;
    white-space: pre;
    -webkit-locale: 'en';
  }
  `
}

function getSVGString(svgdata) {
  // template from: https://github.com/SNDST00M/SNDST00M
  return `
  <svg xmlns="http://www.w3.org/2000/svg">
    <foreignObject x="0" y="0" id="window">
      <style>${getStyles()}</style>
      <pre xmlns="http://www.w3.org/1999/xhtml" id="terminal">${svgdata}</pre>
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
  options: function (options) {
    Object.assign(svgOptions, options)
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

import fs from 'fs'
import path from 'path'

import Anser from 'anser'
import { JSDOM } from 'jsdom'

import { CWD } from '../utils/constants.js'
import { svgOptions as DefaultSvgOptions } from '../../stubs/config.mjs'

import type { ISVGOptions, ISVGOptionsPartial } from '../config.js'

const svgOptions = DefaultSvgOptions as ISVGOptions

function getStyles() {
  const { colors, ...rest } = svgOptions
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
    --font-size: ${rest.fontSize}px;
    --line-height: ${rest.lineHeight}px;
    --term-rows: ${rest.rows};
    --term-cols: ${rest.cols};
    --term-px: ${rest.paddingX};
    --term-py: ${rest.paddingY};
    --term-rad: ${rest.radius};
    --color-bg: ${colors.backgroundColor};
    --color-fg: ${colors.foregroundColor};
    font-size: var(--font-size);
    line-height: var(--line-height);
    font-family: monospace;
    text-size-adjust: 100%;
    color: var(--color-fg);
    width: calc((var(--term-cols) * 0.5em) + (var(--term-px) * 2px));
    height: calc((var(--term-rows) * var(--line-height)) + (var(--term-py) * 2px) - (var(--line-height) - var(--font-size)));
  }
  #terminal {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: inline-block;
    margin: 0;
    padding: calc(var(--term-py) * 1px) calc(var(--term-px) * 1px);
    border-radius: calc(var(--term-rad) * 1px);
    background-color: var(--color-bg);
    white-space: pre;
    -webkit-locale: 'en';
  }
  #terminal > * {
    animation-name: animateIn;
    animation-duration: 0ms;
    animation-delay: calc(var(--animation-delay) * ${rest.animationDuration}ms);
    animation-fill-mode: both;
    animation-timing-function: linear;
  }
  @keyframes animateIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  `
}

function getDimensions() {
  const width =
    svgOptions.cols * svgOptions.fontSize * 0.5 + 2 * svgOptions.paddingX
  const height =
    svgOptions.rows * svgOptions.lineHeight +
    2 * svgOptions.paddingY -
    svgOptions.lineHeight +
    svgOptions.fontSize
  return { width, height }
}

function getSVGString(svgdata: string) {
  const dims = getDimensions()
  const rawSVG = (
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dims.width} ${dims.height}" width="${dims.width}" height="${dims.height}">
  <foreignObject x="0" y="0" id="window">
    <style>${getStyles()}</style>
    <pre xmlns="http://www.w3.org/1999/xhtml" id="terminal">${svgdata}</pre>
  </foreignObject>
</svg>`
  )
  const dom = new JSDOM(rawSVG)
  const lines = dom.window.document.getElementById('terminal')?.children
  if (lines !== undefined) {
    const animationDelayDelta = 1 / (lines.length - 1)
    let animationDelay = 0
    for (const [i, node] of Object.entries(lines)) {
      // FIXME: 
      // @ts-ignore
      // Property 'style' does not exist on type 'Element'
      // the code works, style does exist
      node.style.setProperty('--animation-delay', animationDelay)
      animationDelay += animationDelayDelta
    }
  }
  return dom.window.document.body.innerHTML
}

function getSVGPath(svgpath: string) {
  svgpath = path.resolve(CWD, svgpath)
  if (!svgpath.endsWith('.svg')) svgpath = path.resolve(svgpath, 'output.svg')
  let svgdir = path.dirname(svgpath)
  if (!fs.existsSync(svgdir)) fs.mkdirSync(svgdir)
  return svgpath
}

export const renderer = {
  options: function (options?: ISVGOptionsPartial) {
    // FIXME: deep assign
    Object.assign(svgOptions, options)
    return this
  },
  render: function (ansistr: string) {
    let svgdata = Anser.ansiToHtml(ansistr, { use_classes: true })
    let svgstring = getSVGString(svgdata)
    return svgstring
  },
  save: async function (svggstr: string, svgpath: string) {
    svgpath = getSVGPath(svgpath)
    await fs.promises.writeFile(svgpath, svggstr)
  },
}

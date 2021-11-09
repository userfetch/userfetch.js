import * as githubAPI from './apis/github.js'
import { renderer } from './renderer/terminal.js'
import { renderer as SVGRenderer } from './renderer/svg.js'

export async function main(args, env, config) {
  const template = args.user ? config.templateDefault : config.template
  
  githubAPI.authenticate(env.github_token)
  const githubStats = await githubAPI.fetch(args.user)
  
  const output = renderer
    .options({
      colors: config.colors,
      symbols: config.symbols,
      meta: config.meta,
    })
    .render(template, githubStats)
  
  if (args.svg) {
    let svg = SVGRenderer.options(config.svgOptions).render(output)
    await SVGRenderer.save(svg, args.svg)
  }
  
  return output
}
import * as githubAPI from './apis/github.js'
import { renderer as TextRenderer } from './renderer/terminal.js'
import { renderer as SVGRenderer } from './renderer/svg.js'

import type { IConfigPartial } from './config.js'

export async function main(
  // FIXME: args and env types
  args: Record<string, any>,
  env: NodeJS.ProcessEnv,
  config: IConfigPartial
) {
  const template = args.user ? config.templateDefault : config.template

  githubAPI.authenticate(env.github_token)
  const githubStats = await githubAPI.fetch(args.user)

  const output = {
    text: '',
    svg: '',
  }

  output.text = TextRenderer.options(config.textOptions).render(
    template,
    githubStats
  )

  if (args.svg)
    output.svg = SVGRenderer.options(config.svgOptions).render(output.text)

  return {
    output,
    debugInfo: {
      githubStats,
    },
  }
}

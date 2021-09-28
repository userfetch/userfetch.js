import githubAPI from './apis/github.js'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

// =============================================================================

// let stats = await githubAPI(process.env.github_token)()

// =============================================================================
// var table = term.createInlineElement(termkit.TextTable, {
//   cellContents: [
//     [asciiart.toString().replaceAll('^', '^^'), '   ', 'cell'],
//     [asciiart.toString().replaceAll('^', '^^'), '   ', 'cell'],
//     [asciiart.toString().replaceAll('^', '^^'), '   ', 'cell'],
//   ],
//   hasBorder: false,
//   fit: false,
//   contentHasMarkup: true,
//   //   height: 'auto',
// })
// term.table(
//   [
//     ['header #1', 'header #2', 'header #3'],
//     [
//       'row #1',
//       'a much bigger cell, a much bigger cell, a much bigger cell... ',
//       'cell',
//     ],
//     ['row #2', 'cell', 'a medium cell'],
//     ['row #3', 'cell', 'cell'],
//     [
//       'row #4',
//       'cell\nwith\nnew\nlines',
//       '^YThis ^Mis ^Ca ^Rcell ^Gwith ^Bmarkup^R^+!',
//     ],
//   ],
//   {
//     hasBorder: true,
//     contentHasMarkup: true,
//     borderChars: 'lightRounded',
//     borderAttr: { color: 'blue' },
//     textAttr: { bgColor: 'default' },
//     firstCellTextAttr: { bgColor: 'blue' },
//     firstRowTextAttr: { bgColor: 'yellow' },
//     firstColumnTextAttr: { bgColor: 'red' },
//     width: 60,
//     fit: true, // Activate all expand/shrink + wordWrap
//   }
// )
//console.log( '\n' ) ;
//console.log( 'ok' ) ;
// process.exit()

// TODO
// title("")
// info("", "")
// underline()
// meter("", 0)
// list("", [""])
// left()
// right()
// raw("", [""])
// text("")
// multitext("")
// command("", "")

// TODO
// cli:
// --token="ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
// --user="octocat"
// --config="./path/to/config.js"
// --ascii="./path/to/ascii"

// const tableRows = [
//   ['Column1', 'Column2', 'Column3'],
//   ['Row1', 'Row1', 'Row1'],
//   ['Row2', 'Row2', 'Row2'],
//   ['Row3', 'Row3', 'Row3'],
// ]

// const tableProps = {
//   fit: false,
// }

// term.createInlineElement(termkit.TextTable, {
//   cellContents: [...tableRows],
//   ...tableProps,
// })

// term.table([...tableRows], { ...tableProps })

// console.log(
//   'Ad pariatur minim incididunt duis ut irure in consequat quis. Consectetur Lorem Lorem voluptate adipisicing et laborum veniam ad duis. Proident quis sint ad ex. Ex minim excepteur nulla consectetur cillum officia aliquip aliquip duis adipisicing non aute. Velit occaecat dolore amet qui esse minim ea.'
// )

import * as esbuild from 'esbuild'
import * as sass from 'sass'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const buildDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(buildDir, '../..')
const publicDir = path.join(repoRoot, 'public')
const stylesEntry = path.join(repoRoot, 'assets/styles/index.scss')
const jsOut = path.join(publicDir, 'application.js')
const cssOut = path.join(publicDir, 'application.css')

function compileStyles () {
  let source = fs.readFileSync(stylesEntry, 'utf8')
  source = source.replace(
    "@import '~bootstrap/scss/bootstrap';",
    "@import 'bootstrap/scss/bootstrap';"
  )
  const result = sass.compileString(source, {
    loadPaths: [path.join(buildDir, 'node_modules')],
    style: 'expanded',
    quietDeps: true
  })
  fs.mkdirSync(publicDir, { recursive: true })
  fs.writeFileSync(cssOut, result.css)
  console.log('Wrote', path.relative(repoRoot, cssOut), `(${result.css.length} bytes)`)
}

async function compileScript () {
  await esbuild.build({
    absWorkingDir: buildDir,
    entryPoints: [path.join(buildDir, 'browser-entry.js')],
    outfile: jsOut,
    bundle: true,
    platform: 'browser',
    format: 'iife',
    logLevel: 'info',
    sourcemap: false,
    legalComments: 'eof' // retain third-party license notices in the distributed bundle
  })
  const stat = fs.statSync(jsOut)
  console.log('Wrote', path.relative(repoRoot, jsOut), `(${stat.size} bytes)`)
}

await compileStyles()
await compileScript()

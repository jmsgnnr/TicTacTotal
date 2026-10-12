'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const repoRoot = path.join(__dirname, '..')
const applicationJs = path.join(repoRoot, 'public/application.js')
const applicationCss = path.join(repoRoot, 'public/application.css')

describe('browser build smoke', () => {
  it('application.js exists and reflects refactored game adapter', () => {
    assert.ok(fs.existsSync(applicationJs), 'run tools/browser-build build first')
    const bundle = fs.readFileSync(applicationJs, 'utf8')
    assert.match(bundle, /domInitialized/)
    assert.match(bundle, /aria-label/)
    assert.doesNotMatch(
      bundle,
      /\.gameBoard['"]\)\.on\(['"]click['"],\s*gameLogic\.gameRunFormula\(\)\)/
    )
  })

  it('application.css exists with compiled game board rules', () => {
    assert.ok(fs.existsSync(applicationCss), 'run tools/browser-build build first')
    const css = fs.readFileSync(applicationCss, 'utf8')
    assert.match(css, /\.game-container/)
    assert.match(css, /\.cell/)
  })
})

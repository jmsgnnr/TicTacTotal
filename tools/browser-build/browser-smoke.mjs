/** Offline browser acceptance for TicTacTotal's rebuilt application.
 * Uses a locally installed Chrome/Edge if Playwright's bundled browser is missing.
 * No authentication API or offsite network calls are permitted during tests.
 */
import assert from 'node:assert/strict'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const screenshots = path.resolve(repoRoot, '../../agentic-runs/tictactotal-round3')
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.ico': 'image/x-icon' }

function serveStatic (root) {
  return http.createServer((req, res) => {
    let requestPath
    try { requestPath = decodeURIComponent((req.url || '/').split('?')[0]) } catch {
      res.writeHead(400).end()
      return
    }
    const filePath = path.resolve(root, '.' + (requestPath === '/' ? '/index.html' : requestPath))
    const rel = path.relative(root, filePath)
    if (rel.startsWith('..') || path.isAbsolute(rel)) {
      res.writeHead(403).end()
      return
    }
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(404).end('not found'); return }
      res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream' })
      res.end(data)
    })
  })
}

async function launchAvailableBrowser () {
  const candidates = [
    ['Playwright Chromium', {}],
    ['Installed Chrome', { executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' }],
    ['Installed Edge', { executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' }]
  ]
  const failures = []
  for (const [name, settings] of candidates) {
    try { return { browser: await chromium.launch({ headless: true, ...settings }), name } }
    catch (err) { failures.push(name + ': ' + String(err.message).split('\n')[0]) }
  }
  throw new Error('No browser could be launched:\n' + failures.join('\n'))
}

const server = serveStatic(repoRoot)
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const base = 'http://127.0.0.1:' + server.address().port
let browser
try {
  const launched = await launchAvailableBrowser()
  browser = launched.browser
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const pageErrors = []
  const offsite = []
  const consoleErrors = []
  page.on('pageerror', err => pageErrors.push(String(err)))
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()) })
  await page.route('**/*', async route => {
    const u = route.request().url()
    if (u.startsWith(base + '/') || u.startsWith('data:')) return route.continue()
    offsite.push(u)
    return route.abort()
  })
  const response = await page.goto(base + '/index.html', { waitUntil: 'domcontentloaded' })
  assert.equal(response.status(), 200)
  await page.waitForFunction(() => document.querySelector('.cell[data-cell-index="0"]')?.getAttribute('role') === 'button')
  await page.evaluate(() => { document.querySelector('.gameBoard').style.display = 'block' }) // bypass unavailable historical authentication, no backend calls

  const status = page.locator('.game--status')
  const cell = i => page.locator('.cell[data-cell-index="' + i + '"]')
  const move = async (i, expected) => {
    await cell(i).click()
    assert.equal(await cell(i).textContent(), expected, 'cell ' + i)
  }
  const restart = async () => {
    await page.locator('.game--restart').click()
    assert.match(await status.textContent(), /X's turn/)
    for (let i=0; i<9; i++) assert.equal(await cell(i).textContent(), '', 'reset cell ' + i)
  }

  assert.match(await status.textContent(), /X's turn/)
  await move(0, 'X')
  assert.match(await status.textContent(), /O's turn/)
  await move(3, 'O')
  await move(1, 'X')
  await move(4, 'O')
  await move(2, 'X')
  assert.match(await status.textContent(), /Player X has won/)
  // Playwright correctly considers aria-disabled elements non-clickable. Dispatch a synthetic event to verify the engine guard too.
  assert.equal(await cell(5).getAttribute('aria-disabled'), 'true')
  await cell(5).dispatchEvent('click')
  assert.equal(await cell(5).textContent(), '', 'post-game click must be ignored')
  await restart()

  // Full nine-move draw on the real rendered application.
  const drawMoves = [0, 1, 2, 4, 3, 5, 7, 6, 8]
  for (let i = 0; i < drawMoves.length; i++) await move(drawMoves[i], i % 2 === 0 ? 'X' : 'O')
  assert.match(await status.textContent(), /draw/i)
  await restart()

  // Native keyboard semantics on div-based cells: Enter and Space.
  await cell(0).focus()
  await page.keyboard.press('Enter')
  assert.equal(await cell(0).textContent(), 'X')
  await cell(1).focus()
  await page.keyboard.press('Space')
  assert.equal(await cell(1).textContent(), 'O')
  assert.equal(await cell(0).getAttribute('aria-disabled'), 'true')
  await cell(0).dispatchEvent('click')
  assert.equal(await cell(0).textContent(), 'X', 'occupied cell unchanged')
  await restart()

  for (const [width, height, label] of [[1440,900,'desktop'],[390,844,'mobile']]) {
    await page.setViewportSize({ width, height })
    const overflow = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      width: document.documentElement.clientWidth
    }))
    assert.ok(overflow.scroll <= overflow.width + 1, label + ' horizontal overflow: ' + JSON.stringify(overflow))
    if (fs.existsSync(screenshots)) {
      await page.screenshot({ path: path.join(screenshots, 'tictactotal-' + label + '.png'), fullPage: true })
    }
  }
  const unexpected = offsite.filter(u => !u.includes('fonts.googleapis.com') && !u.includes('fonts.gstatic.com'))
  assert.deepEqual(unexpected, [], 'unexpected external request attempts')
  assert.deepEqual(pageErrors, [], 'uncaught page errors')
  assert.deepEqual(consoleErrors.filter(t => !t.includes('fonts.googleapis.com') && !t.includes('ERR_FAILED')), [], 'console errors')

  console.log('BROWSER ACCEPTANCE PASS: ' + launched.name + ' (1440px and 390px, win, draw, reset, occupied, post-game, keyboard Enter+Space, no auth calls, no JS errors, no horizontal overflow)')
} finally {
  if (browser) await browser.close()
  await new Promise(resolve => server.close(resolve))
}

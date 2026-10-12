'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

const gameLogic = require('../assets/scripts/gameLogic')

function makeFakeRoot () {
  const status = { textContent: '' }
  const restartListeners = []
  const restart = {
    addEventListener: function (type, fn) {
      if (type === 'click') restartListeners.push(fn)
    }
  }

  const cells = []
  for (let i = 0; i < 9; i++) {
    const listeners = { click: [], keydown: [] }
    cells.push({
      textContent: '',
      attributes: { 'data-cell-index': String(i) },
      getAttribute: function (name) {
        return this.attributes[name]
      },
      setAttribute: function (name, value) {
        this.attributes[name] = value
      },
      hasAttribute: function (name) {
        return Object.prototype.hasOwnProperty.call(this.attributes, name)
      },
      addEventListener: function (type, fn) {
        listeners[type].push(fn)
      },
      dispatch: function (type, event) {
        listeners[type].forEach(function (fn) { fn(event) })
      }
    })
  }

  const root = {
    querySelector: function (sel) {
      if (sel === '.game--status') return status
      if (sel === '.game--restart') return restart
      return null
    },
    querySelectorAll: function (sel) {
      if (sel === '.cell') return cells
      return []
    }
  }

  return {
    root,
    status,
    cells,
    restart: function () {
      restartListeners.forEach(function (fn) { fn({ preventDefault: function () {} }) })
    }
  }
}

describe('gameLogic DOM adapter', () => {
  it('initializes once, handles clicks, blocks occupied cells, and restarts', () => {
    const fake = makeFakeRoot()
    const controller = gameLogic.bindDomGame(fake.root)
    assert.ok(controller)

    fake.cells[0].dispatch('click', { target: fake.cells[0], currentTarget: fake.cells[0] })
    assert.equal(fake.cells[0].textContent, 'X')
    assert.match(fake.status.textContent, /O's turn/)

    fake.cells[0].dispatch('click', { target: fake.cells[0], currentTarget: fake.cells[0] })
    assert.equal(fake.cells[0].textContent, 'X')

    fake.cells[1].dispatch('click', { target: fake.cells[1], currentTarget: fake.cells[1] })
    assert.equal(fake.cells[1].textContent, 'O')

    fake.restart()
    assert.equal(fake.cells[0].textContent, '')
    assert.match(fake.status.textContent, /X's turn/)
  })

  it('adds accessible names and keyboard activation to cells', () => {
    const fake = makeFakeRoot()
    gameLogic.bindDomGame(fake.root)
    fake.cells.forEach(function (cell, index) {
      assert.equal(cell.getAttribute('tabindex'), '0')
      assert.equal(cell.getAttribute('role'), 'button')
      assert.equal(cell.getAttribute('aria-label'), 'Cell ' + (index + 1) + ', empty')
      assert.equal(cell.getAttribute('aria-disabled'), 'false')
    })
    let prevented = false
    fake.cells[4].dispatch('keydown', {
      key: 'Enter',
      currentTarget: fake.cells[4],
      preventDefault: function () { prevented = true }
    })
    assert.equal(prevented, true)
    assert.equal(fake.cells[4].textContent, 'X')
    assert.equal(fake.cells[4].getAttribute('aria-label'), 'Cell 5, X')
    assert.equal(fake.cells[4].getAttribute('aria-disabled'), 'true')
    fake.restart()
    assert.equal(fake.cells[4].getAttribute('aria-label'), 'Cell 5, empty')
    assert.equal(fake.cells[4].getAttribute('aria-disabled'), 'false')
  })
})

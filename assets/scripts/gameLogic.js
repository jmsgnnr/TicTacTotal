'use strict'

const engine = require('./gameEngine')

function activateCell (cell) {
  if (!cell.hasAttribute('tabindex')) {
    cell.setAttribute('tabindex', '0')
  }
  if (!cell.getAttribute('role')) {
    cell.setAttribute('role', 'button')
  }
}

function bindDomGame (root) {
  const doc = root.ownerDocument || root.defaultView && root.defaultView.document || root
  const query = (sel) => (root.querySelector ? root.querySelector(sel) : doc.querySelector(sel))
  const queryAll = (sel) => (root.querySelectorAll ? root.querySelectorAll(sel) : doc.querySelectorAll(sel))

  const statusDisplay = query('.game--status')
  const restartButton = query('.game--restart')
  const cells = queryAll('.cell')

  if (!statusDisplay || !restartButton || !cells.length) {
    return null
  }

  let state = engine.createGameState()
  let initialized = false

  function renderStatus () {
    statusDisplay.textContent = engine.statusMessage(state)
  }

  function renderBoard () {
    cells.forEach(function (cell, index) {
      const mark = state.board[index]
      cell.textContent = mark
      cell.setAttribute('aria-label', 'Cell ' + (index + 1) + ', ' + (mark || 'empty'))
      cell.setAttribute('aria-disabled', (!state.active || mark !== '').toString())
    })
  }

  function handleRestartGame () {
    engine.resetGame(state)
    renderStatus()
    renderBoard()
  }

  function handleCellActivation (cell, index) {
    const result = engine.playMove(state, index)
    if (!result.ok) {
      return
    }
    renderBoard()
    renderStatus()
  }

  function handleCellClick (clickedCellEvent) {
    const clickedCell = clickedCellEvent.currentTarget || clickedCellEvent.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'), 10)
    handleCellActivation(clickedCell, clickedCellIndex)
  }

  function handleCellKeydown (event) {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }
    event.preventDefault()
    const cell = event.currentTarget
    const index = parseInt(cell.getAttribute('data-cell-index'), 10)
    handleCellActivation(cell, index)
  }

  function attachListeners () {
    if (initialized) {
      return
    }
    initialized = true
    cells.forEach(function (cell) {
      activateCell(cell)
      cell.addEventListener('click', handleCellClick)
      cell.addEventListener('keydown', handleCellKeydown)
    })
    restartButton.addEventListener('click', handleRestartGame)
    renderStatus()
    renderBoard()
  }

  attachListeners()

  return {
    getState: function () { return state },
    restart: handleRestartGame
  }
}

let domInitialized = false

const gameRunFormula = function () {
  if (domInitialized) {
    return
  }
  domInitialized = true
  bindDomGame(document)
}

module.exports = {
  gameRunFormula,
  bindDomGame
}

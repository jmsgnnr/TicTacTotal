'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

const engine = require('../assets/scripts/gameEngine')

describe('gameEngine', () => {
  it('starts with an empty board and X to play', () => {
    const state = engine.createGameState()
    assert.deepEqual(state.board, engine.EMPTY_BOARD)
    assert.equal(state.currentPlayer, 'X')
    assert.equal(state.active, true)
  })

  it('rejects occupied, out-of-range, and post-game moves', () => {
    const state = engine.createGameState()
    assert.equal(engine.playMove(state, 0).ok, true)
    assert.deepEqual(engine.playMove(state, 0), { ok: false, reason: 'occupied' })
    assert.deepEqual(engine.playMove(state, -1), { ok: false, reason: 'out_of_range' })
    assert.deepEqual(engine.playMove(state, 9), { ok: false, reason: 'out_of_range' })

    state.active = false
    assert.deepEqual(engine.playMove(state, 1), { ok: false, reason: 'game_over' })
  })

  it('detects all eight winning lines', () => {
    const lines = engine.WINNING_CONDITIONS
    assert.equal(lines.length, 8)

    lines.forEach(function (line) {
      const board = engine.EMPTY_BOARD.slice()
      board[line[0]] = 'X'
      board[line[1]] = 'X'
      board[line[2]] = 'X'
      const outcome = engine.getOutcome(board)
      assert.equal(outcome.type, 'win')
      assert.equal(outcome.winner, 'X')
    })
  })

  it('detects a draw when the board is full with no winner', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']
    assert.deepEqual(engine.getOutcome(board), { type: 'draw' })
  })

  it('alternates players until someone wins', () => {
    const state = engine.createGameState()
    engine.playMove(state, 0)
    assert.equal(state.currentPlayer, 'O')
    engine.playMove(state, 3)
    assert.equal(state.currentPlayer, 'X')
    engine.playMove(state, 1)
    engine.playMove(state, 4)
    const win = engine.playMove(state, 2)
    assert.equal(win.ok, true)
    assert.equal(win.outcome.type, 'win')
    assert.equal(state.winner, 'X')
    assert.equal(state.active, false)
  })

  it('resetGame restores a fresh state', () => {
    const state = engine.createGameState()
    engine.playMove(state, 0)
    engine.resetGame(state)
    assert.deepEqual(state.board, engine.EMPTY_BOARD)
    assert.equal(state.currentPlayer, 'X')
    assert.equal(state.active, true)
    assert.equal(state.winner, null)
  })

  it('statusMessage reflects turn, win, and draw', () => {
    const state = engine.createGameState()
    assert.match(engine.statusMessage(state), /X's turn/)
    state.winner = 'O'
    assert.match(engine.statusMessage(state), /Player O has won/)
    const drawState = engine.createGameState()
    drawState.isDraw = true
    assert.match(engine.statusMessage(drawState), /draw/)
  })
})

'use strict'

const WINNING_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const EMPTY_BOARD = ['', '', '', '', '', '', '', '', '']

function createGameState () {
  return {
    board: EMPTY_BOARD.slice(),
    currentPlayer: 'X',
    active: true,
    winner: null,
    isDraw: false
  }
}

function resetGame (state) {
  state.board = EMPTY_BOARD.slice()
  state.currentPlayer = 'X'
  state.active = true
  state.winner = null
  state.isDraw = false
  return state
}

function getOutcome (board) {
  for (let i = 0; i < WINNING_CONDITIONS.length; i++) {
    const winCondition = WINNING_CONDITIONS[i]
    const a = board[winCondition[0]]
    const b = board[winCondition[1]]
    const c = board[winCondition[2]]
    if (a === '' || b === '' || c === '') {
      continue
    }
    if (a === b && b === c) {
      return { type: 'win', winner: a, line: winCondition.slice() }
    }
  }
  if (!board.includes('')) {
    return { type: 'draw' }
  }
  return { type: 'ongoing' }
}

function playMove (state, index) {
  if (!state.active) {
    return { ok: false, reason: 'game_over' }
  }
  if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index > 8) {
    return { ok: false, reason: 'out_of_range' }
  }
  if (state.board[index] !== '') {
    return { ok: false, reason: 'occupied' }
  }

  const player = state.currentPlayer
  state.board[index] = player
  const outcome = getOutcome(state.board)

  if (outcome.type === 'win') {
    state.active = false
    state.winner = outcome.winner
    return { ok: true, outcome }
  }
  if (outcome.type === 'draw') {
    state.active = false
    state.isDraw = true
    return { ok: true, outcome }
  }

  state.currentPlayer = player === 'X' ? 'O' : 'X'
  return { ok: true, outcome }
}

function statusMessage (state) {
  if (state.winner) {
    return 'Player ' + state.winner + ' has won!'
  }
  if (state.isDraw) {
    return 'Game ended in a draw!'
  }
  return "It's " + state.currentPlayer + "'s turn"
}

module.exports = {
  WINNING_CONDITIONS,
  EMPTY_BOARD,
  createGameState,
  resetGame,
  getOutcome,
  playMove,
  statusMessage
}

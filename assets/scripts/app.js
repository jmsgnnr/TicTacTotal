'use strict'
const preGameEvents = require('./preGameEvents')
const gameLogic = require('./gameLogic')

$(() => {
  $('.authenticated').hide()
  $('.gameBoard').hide()
  $('#sign-up').on('submit', preGameEvents.onSignUp)
  $('#sign-in').on('submit', preGameEvents.onSignIn)
  $('#change-password').on('submit', preGameEvents.onChangePassword)
  $('.signOut').on('click', preGameEvents.onSignOut)
  $('.testing').on('click', preGameEvents.onNewGame)
  $('.getGames').on('click', preGameEvents.onGetGames)
  gameLogic.gameRunFormula()
})

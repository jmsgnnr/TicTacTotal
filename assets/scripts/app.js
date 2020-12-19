'use strict'
const preGameEvents = require('./preGameEvents')
const gameLogic = require('./gameLogic')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('.authenticated').hide()
  $('.gameBoard').hide()
  $('#sign-up').on('submit', preGameEvents.onSignUp)
  $('#sign-in').on('submit', preGameEvents.onSignIn)
  $('#change-password').on('submit', preGameEvents.onChangePassword)
  $('.signOut').on('click', preGameEvents.onSignOut)
  $('#play').on('click', preGameEvents.onSignOut)
$('.testing').on('click', preGameEvents.onNewGame)
////REMEMBER ( FOR YOUR FUNCTIONS)
$('.gameBoard').on('click', gameLogic.gameRunFormula())
$('.getGames').on('click', preGameEvents.onGetGames)

})
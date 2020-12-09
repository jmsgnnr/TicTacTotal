'use strict'
const authEvents = require('./authEvents')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('.authenticated').hide()
  // Sign Up listener:
  $('#sign-up').on('submit', authEvents.onSignUp)

  // Sign In listener:
  $('#sign-in').on('submit', authEvents.onSignIn)

  // Change Password listener:
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('signout-button').on('click', authEvents.onSignOut)
})
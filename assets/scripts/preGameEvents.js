
'use strict'
const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../lib/get-form-fields')
const gameLogic  = require('./gameLogic.js')

const onSignUp = function (event) {
  
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}
const onSignIn = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}
const onSignOut = function(event){
event.preventDefault()

api.signOut()
.then(ui.signOutSuccess)
.catch(ui.signOutFailure)
}

const onNewGame = function(event){
  console.log('youve made it to events!')
  event.preventDefault()
  api.newGame()
  .then(ui.newGameSuccess)
  .catch(ui.newGameFailure)
   

}





module.exports = {
  
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onNewGame,

}


'use strict'
const store = require('./store')


const signUpSuccess = function (response) {
  $('#message').text('Signed Up Successfully! :)')
  
}
const signUpFailure = function (error) {
  console.log(error)
  $('#message').text('Sign Up FAILED :( with error: ' + error.responseJSON.message)
}

const signInSuccess = function (response) {
  $('#message').text('Sign In Success! Welcome :)')
  console.log(store)
  store.user = response.user
  
$('.unauthenticated').hide()
$('.authenticated').show()

}


const signInFailure = function (error) {
  $('#message').text('Sign In failed!!!!' + error.responseJSON.message)
}

const changePasswordSuccess = function () {
    $('#message').text('Change password success! :)')
  }

const changePasswordFailure = function (error) {
  $('#message').text('Change password failed wit error: ' + error.responseJSON.message)
$('form').trigger('reset')
}
const signOutSuccess = function () {
    $('#message').text('sign out success! :)')
    $('.unauthenticated').show()
$('.authenticated').hide()
$('.gameBoard').hide()
store.user = null
$('form').trigger('reset')

  }
  const signOutFailure = function (){
console.log('hi')

  }
  const newGameSuccess = function (){
    let gameState = ["", "", "", "", "", "", "", "", ""];
    $('#message').text('New Game Success! Welcome :)')
    console.log(store)
    $('.gameBoard').show()
    $('.testing').hide()
  }
  const newGameFailure = function (error){
    $('#message').text('new game failed wit error: ' + error.responseJSON.message)
    
}

 


module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  newGameSuccess,
  newGameFailure,
  signOutFailure

  
}
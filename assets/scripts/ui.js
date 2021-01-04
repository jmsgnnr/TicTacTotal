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
$('form').trigger('reset')

}


const signInFailure = function (error) {
  $('#message').text('Sign In failed!!!!' + error.responseJSON.message)
  $('form').trigger('reset')

}

const changePasswordSuccess = function () {
    $('#message').text('Change password success! :)')
    $('form').trigger('reset')

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
$('form').trigger('reset')


  }
  const newGameSuccess = function (games){
    $('#message').text('New Game Success! Welcome :)')
    console.log(store)
    $('.gameBoard').show()
    $('.testing').hide()
    $('form').trigger('reset')

  }
  const newGameFailure = function (error){
    $('#message').text('new game failed wit error: ' + error.responseJSON.message)
    $('form').trigger('reset')

  
}
const getGamesSuccess = function (responseData) {
  console.log(responseData)
  const numberOfGamesPlayed = responseData.games.length

  $('#message').text('Total Games Played: ' + numberOfGamesPlayed)
    $('form').trigger('reset')

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
  signOutFailure,
  getGamesSuccess,
 

  
}
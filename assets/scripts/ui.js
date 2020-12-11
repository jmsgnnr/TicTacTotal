'use strict'
const store = require('./store')


const signUpSuccess = function (response) {
  $('#message').text('Signed Up Successfully! :)')
  $('form').trigger('reset')  
}

const signUpFailure = function (error) {
  console.log(error)
  $('#message').text('Sign Up FAILED :( with error: ' + error.responseJSON.message)
}

const signInSuccess = function (response) {
  $('#message').text('Sign In Success! Welcome :)')
  console.log(store)
  store.user = response.user
  $('form').trigger('reset')  
  
$('.unauthenticated').hide()
$('.authenticated').show()

}


const signInFailure = function (error) {
  $('#message').text('Sign In failed ' + error.responseJSON.message)
}

// Success gives us a 204 "no content"
// So there is no response object
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
    $('.unauthenticated').hide()
$('.authenticated').show()
store.user = null
   

  }
  const newGameSuccess = function (){
    console.log('HOWDY')


  }
  const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();
  const signOutFailure = function () {
    $('.unauthenticated').hide()
    $('.authenticated').show()
    $('#message').text('sign out failure :)')
  }
  function playerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}



 


module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  playerChange,
  newGameSuccess
  
}
'use strict'
// followed formula from notes.
// use api docs , make sure to compare for game docs 




const config = require('./config.js')
const store = require('./store')

// is /games/:id /games/ + store game.Id is same ?????? 
const getGames = function () {
  return $.ajax({
    url: config.apiUrl + '/games/',
    method: 'GET',
    headers: {authorization: 'Token token=' + store.user.token},
    data: {}
  })
}

// const createGame = function () {
//   return $.ajax({
//     url: config.apiUrl + '/games',
//     method: 'POST',
//     headers: {authorization: 'Token token=' + store.user.token},
//     data: {}
//   })
// }

// const updateGame = function () {
//   return $.ajax({
//     url: config.apiUrl + '/games/' + store.gameId,
//     method: 'PATCH',
//     headers: {authorization: 'Token token=' + store.user.token},
//     data: {
//       'game': {
//         'cell': {
//           'index': store.index,
//           'value': store.value
//         },
//         'over': store.gameOver
//       }
//     }
//   })

module.exports = {
  getGames,
  // createGame,
  // updateGame
}


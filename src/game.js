import Round from './round'
import Questions from './question'

class Game {

  constructor(id, player) {
    this.id = id
    this.players = {}
    this.players[player.id] = player
    this.rounds = this.createRounds()
    this.started = false
    this.roundNo = 0
    this.numOfRounds = 3
    this.playerCount = 1
  }

  createRounds() {
    let questions = Questions.getQuestions(this.numOfRounds)
    return questions.map(x => new Round(x))
  }

  addPlayer(player){
    this.players[player.id] = player
    this.playerCount++
  }

  removePlayer(player) {
    delete this.players[player.id]
    this.playerCount--
  }

  addPlayerName(playerId, name) {
    this.players[playerId].setName(name)
  }

  getPlayerArray() {
    return Object.values(this.players)
  }

  includesPlayer(playerId) {
    this.getPlayerArray().forEach((x) => {
      if (x.id == playerId) {
        return true
      }
    })
    return false
  }

  setRounds(rounds) {
    this.rounds = rounds
  }

  newRound() {
    return this.rounds[++this.roundNo]
  }

  getRound() {
    return this.rounds[this.roundNo]
  }

  startGame() {
    this.started = true
  }
}

export default Game;
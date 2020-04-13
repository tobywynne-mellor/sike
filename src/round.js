class Round {

  constructor(question) {
    this.question = question
    this.answers = {}
    this.voted = []
    this.formattedQuestion = null
  }

  // add a random name to question
  formatQuestion(names) {
    if (!this.formattedQuestion) {
      this.formattedQuestion = this.question.replace('<name>', names[Math.floor(Math.random() * names.length)])
    }
    return this.formattedQuestion
  }

  // answers are indexed by player id
  addAnswer(answer, player) {
    this.answers[player.id] = {playerid: player.id, answer: answer, votes: 0}
  }

  voteForAnswer(answer, player) {
    this.answers[answer.playerid].votes++
    voted = [...voted, player.id]
  }

  everyoneVoted(numOfPlayers) {
    return numOfPlayers == this.voted.length
  }

  getScores() {
    return this.answers
  }
}

export default Round
import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import io from 'socket.io'
import http from 'http'
import Game from './game'
import Player from './player'
import IdFactory from './idFactory'
import { connect } from 'socket.io-client'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const server = http.createServer()

polka({server}) // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err)
	})

let connections = []

let games = {}

io(server).on('connection', function(socket) {

	if (dev) console.log("client joined " + socket.id)

	// add to connections
	connections = [...connections, socket.id]
	if (dev) console.log("connections="+connections.length)
	if (dev) console.log(connections)

	socket.on('createGame', function(name, sendCodeBack){
		if (dev) console.log("Recieved create game message from client")
		
		let code = IdFactory.uuidv4(4)
		if (dev) console.log("Sending " + code + " code to client")
		sendCodeBack(code);

		if (dev) console.log("Creating game")
		let player = new Player(socket.id, name, "host", code)
		
		socket.emit('newPlayer', player)

		games[code] = new Game(code, player)
		socket.join(code)
	})

	socket.on('joinGame', function(code, name, sendPlayersToClient) {
		if (dev) console.log(socket.id + " requested to join game " + code)

		let game = games[code]

		if (game) {
			let player = new Player(socket.id, name, "participant", code)
			games[code].addPlayer(player)
			socket.join(code);
			socket.to(code).emit('newPlayer', player)
			sendPlayersToClient(games[code].getPlayerArray())
		} else {
			sendPlayersToClient(null)
		}
	})


	//TODO needs work
	socket.on('startGame', function(code){
		console.log('Server recieved startGame request for game: ' + code)
		games[code].startGame()
		socket.to(code).emit('nextRound', games[code].getRound())
	})


	socket.on('disconnect', function() {
		
		if (dev) console.log("client disconnected " + socket.id)
		connections.splice(connections.indexOf(socket.id),1)
		if (dev) console.log('connections=' + connections.length)
		if (dev) console.log(connections)

		let gameKeys = Object.keys(games)
		for (let i = 0; i < gameKeys.length; i++) {
			games[gameKeys[i]].includesPlayer(socket.id)
			console.log("before delete: " + JSON.stringify(games[gameKeys[i]].getPlayerArray()))
			delete games[gameKeys[i]].players[socket.id]
			console.log("after delete: " + JSON.stringify(games[gameKeys[i]].getPlayerArray()))
			socket.to(gameKeys[i]).emit('playerLeft', socket.id)
		}

		console.log(JSON.stringify(games))
	})
})





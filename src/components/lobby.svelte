<script>
	export let flow;
	export let socket;

	let hostLeft = false

	function handlePlay() {
		flow.room.playing = true
		socket.emit('startGame', flow.room.code)
	}

	//TODO check this
	socket.on('startGame', function(code) {
		console.log('client recieved startGame for game: ' + code);
		flow.room.playing = true
	})

	socket.on('newPlayer', function(player){
		console.log('recieved new player ' + player.name)
		flow.room.players = [...flow.room.players, player]
	})

	socket.on('playerLeft', function(playerId) {
		console.log('deleting player ' + playerId)
		let index;

		console.log('players before delete ' + JSON.stringify(flow.room.players))

		for(var i = 0; i < flow.room.players.length; i++) {
			if(flow.room.players[i].id == playerId) {
				index = i
				if (flow.room.players[i].role == "host") {
					alert('Your host has left te game.')
					location.reload() // Go back to start
				}
			}
		}

		if (index) {
			flow.room.players.splice(index, 1)
			flow.room.players = flow.room.players // for svelte to render change
		}
		
		console.log('players that are left: ' + JSON.stringify(flow.room.players))
	})

</script>

<svelte:head>
	<title>Sike🖕 - Lobby 👾</title>
</svelte:head>

<h1>Room</h1>
<h3>{flow.room.code}</h3>
<h1>Players</h1>
<ul>
	{#each flow.room.players as player}
		{#if player.role == "host"}
			<li>{player.name} HOST</li>
		{:else}
			<li>{player.name}</li>
		{/if}
	{/each}
</ul>
{#if flow.create}
	{#if flow.room.players.length >= 2}
		<button on:click={handlePlay}>PLAY</button>
	{:else}
		<h3>Waiting for others to join the game...</h3>
	{/if}
{:else}
	<h3>Waiting for host to start the game...</h3>
{/if}



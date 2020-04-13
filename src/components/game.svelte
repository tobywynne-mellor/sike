<script>
  export let flow
  export let socket
  
  //TODO check how socket io works again
  socket.on('nextRound', function(round) {
    console.log('next round recieved by client: ' + round)
  })
</script>

<svelte:head>
	<title>Sike🖕 - Game</title>
</svelte:head>

<h1>Game</h1>
<p></p>

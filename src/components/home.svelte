<script>
	export let flow;
	export let socket;

	let code = null;
	let name = null;

	function handleCreateGame() {
		// send message to server to generate unique code
		// then handle server response in seperate method which sets code
		if (!name) {
			alert('Please enter a name.')
			return
		}
		socket.emit('createGame', name, function(code){
			flow.room.code = code
			console.log("recived code: " + code)
			
			flow.create = true
			flow.name = name
			flow.id = socket.id
		});
	}

	function handleJoinGame() {
		if (!name) {
			alert('Please enter a name.')
			return 
		}
		if (!code) {
			alert("Enter a code before clicking join.")
			return;
		}
		socket.emit('joinGame', code, name, function(players) {
			if (!players) {
				// didn't join
				alert("The code you entered was invalid.")
			} else {
				// successfully joined
				flow.join = true;
				flow.room.code = code;
				flow.room.players = players;
				flow.id = socket.id
			}
		})
	}

</script>

<svelte:head>
	<title>Sike🖕 - Home</title>
</svelte:head>

<h1>Welcome to Sike🖕</h1>
<input type="text" placeholder="Your name..." bind:value={name}>
<input type="text" placeholder="Join with code..." bind:value={code}/>
<button on:click={handleJoinGame}>Join Game</button>
<button on:click={handleCreateGame}>Create Game</button>
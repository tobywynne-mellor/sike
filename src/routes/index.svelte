<script>
	import Home from '../components/home.svelte'
	import Lobby from '../components/lobby.svelte'
	import Game from '../components/game.svelte'
	import io from "socket.io-client";

	$: flow = {
		join: false,
		create: false,
		room: {
			code: null,
			players: [],
			playing: false
		},
		name: null,
		id: null
	}

	
	let questions = [];

	$: console.log(JSON.stringify(flow.room.players));

	const socket = io();

</script>

{#if !flow.join && !flow.create}
	<Home bind:flow {socket}/>
{:else if !flow.room.playing}
	<Lobby bind:flow {socket}/>
{:else}
	<Game bind:flow {socket}/>
{/if}
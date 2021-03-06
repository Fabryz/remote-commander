$(document).ready(function() {

	/*
	* Functions
	*/

	function log(msg) {
		console.log(new Date().toJSON() +": "+ msg);
	}

	function toggleDebug(spd) {
		var speed = spd || 'fast';
	
		debug.fadeToggle(speed);
		debug.toggleClass("active");
		if (debug.hasClass("active")) {

		} else {

		}
	}

	function init() {
		status.html("Connecting...");

		$(document).keyup(function(e) {
			if (e.keyCode === 220) { //backslash
				toggleDebug();
			}
		});

		message.focus();
	
		message.keydown(function(e) {
			if (e.keyCode === 13) { // enter
				socket.emit("command", { msg: message.val(), from: player.id, to: remoteId.val() });
				message.val('');
			}
		});
	}

	/*
	* Main
	*/

	var completeURL = window.location.href,
		removeURL = window.location.pathname,
		connectURL = completeURL.substr(0, completeURL.indexOf(removeURL));

	var socket = new io.connect(connectURL);
	
	var status = $("#status"),
		clientId = $("#clientId"),
		online = $("#online"),
		tot = $("#tot"),
		debug = $("#debug");

	var message = $("#message"),
		remoteId = $("#remoteId");

	var player = new Player(),
		players = [];
		
	init();

	/* 
	* Socket.IO
	*/

	socket.on('connect', function() {
		status.html("Connected.");
		log("Connected.");
	});

	socket.on('disconnect', function() {
		status.html("Disconnected.");
		log("Disconnected.");
	});

	socket.on('tot', function(data) {	
		tot.html(data.tot);
		log("Current players number: "+ data.tot);
	});

	socket.on('join', function(data) {
		player = jQuery.extend(true, {}, data.player);

		clientId.html(data.player.id);

		log('You have joined the server. (id: '+ data.player.id +').');
	});

	socket.on('quit', function(data) {
		var quitter = '';

		var length = players.length;
		for(var i = 0; i < length; i++) {
			if (players[i].id == data.id) {
				quitter = players[i].nick;
				players.splice(i, 1);
				break;
			}
		}

		log('< Player quitted: '+ quitter +' (id: '+ data.id +').');
	});

	socket.on('newplayer', function(data) {
		var newPlayer = new Player();
		newPlayer = jQuery.extend(true, {}, data.player);
		players.push(newPlayer);

		log('> New player joined: '+ newPlayer.nick +' (id: '+ newPlayer.id +').');
		
		newPlayer = {};
	});

	socket.on('playerlist', function(data) {
		players = []; //prepare for new updated list

		var length = data.list.length;
		for(var i = 0; i < length; i++) {
			var tmpPlayer = new Player();
			tmpPlayer = jQuery.extend(true, {}, data.list[i]);
			players.push(tmpPlayer);

			tmpPlayer = {};
		}

		log('Initial player list received: '+ length +' players.');
	});

	socket.on("execute", function(data) {	
		log("Command received: "+ data.msg);
	});

});
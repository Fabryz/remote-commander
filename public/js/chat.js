/*
*  Author: Fabrizio Codello
*  Name: Testing a simple chat system with private messages
*
*/

$(document).ready(function() {
	var chat, //main handle
		json = JSON.stringify,		
		socket = new io.connect('http://localhost');
	
	var chatLog = $("#chatLog ul"),
		chatMsg = $("#chatMsg"),
		status = $("#status"),
		nick = $("#nick");
		users = $("#users ul"),
		online = $("#online"),
		tot = $("#tot"),
		selected = $("#selected"),
		broadcast = $("#broadcast");
		
	status.html("Connecting.");

	/* 
	* Socket stuff	
	*/
	    
    socket.on('connect', function() {
    	status.html("Connected.");
	});
			
	socket.on('disconnect', function() {
		status.html("Disconnected.");
	});
	
	socket.on('nick', function(data) {
    	nick.html("You are: "+ data.nick);
	});

	socket.on('welcome', function(data) {
    	status.html("Someone connected to RC");
	});
	
	socket.on('quit', function(data) {
    	status.html("Someone quitted from RC");
	});

	socket.on("execute", function(data) {	
		chatLog.append('<li>'+ data.msg +'</li>');
	});

});

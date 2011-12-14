/*
*  This is the Remote controlled client
*
*/

$(document).ready(function() {
	var socket = new Socket();
	
	var log = $("#log ul"),
		status = $("#status"),
		nick = $("#nick");
		
	status.html("Connecting.");

	/* 
	* WebSockets
	*/
	    
    socket.on('connect', function() {
    	status.html("Connected.");
	});
			
	socket.on('disconnect', function() {
		status.html("Disconnected.");
	});
	
	socket.on('nick', function(data) {
    	nick.html(data.nick);
	});

	socket.on('join', function(data) {
    	status.html(data.commander +" has connected to RC");
	});
	
	socket.on('quit', function(data) {
    	status.html(data.commander +" has quitted from RC");
	});

	// here you can trigger whatever you want, according to what is contained on data.msg
	socket.on("execute", function(data) {	
		log.append('<li>'+ data.msg +'</li>');
	});

});

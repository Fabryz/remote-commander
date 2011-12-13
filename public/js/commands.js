/*
*  Author: Fabrizio Codello
*  Name: Testing a simple chat system with private messages
*
*/

$(document).ready(function() {
	var chat, //main handle
		json = JSON.stringify,		
		socket = new io.connect('http://localhost');
	
	var chatMsg = $("#chatMsg"),
        nick = $("#nick"),
		status = $("#status"),
        controlled_id = $("#controlled_id");
		
	status.html("Connecting.");
	chatMsg.focus();
	
	chatMsg.keydown(function(e) {
		if (e.keyCode === 13) { //invio
			socket.emit("command", { msg: chatMsg.val(), from: nick.text(), to: controlled_id.text() });
			chatMsg.val('');
		}
	});

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
    	nick.html(data.nick);
	});
    
     socket.on('controlled_id', function(data) {
    	controlled_id.html(data.controlled_id);
	});
	
});

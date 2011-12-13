/*
*  This is the Commander client
*
*/

$(document).ready(function() {
	var socket = new Socket();
	
	var message = $("#message"),
        nick = $("#nick"),
		status = $("#status"),
        controlled_id = $("#controlled_id");
		
	status.html("Connecting.");
	message.focus();
	
	message.keydown(function(e) {
		if (e.keyCode === 13) { // enter
			socket.emit("command", { msg: message.val(), from: nick.text(), to: controlled_id.text() });
			message.val('');
		}
	});

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
    
     socket.on('controlled_id', function(data) {
    	controlled_id.html(data.controlled_id);
	});
	
});

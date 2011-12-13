var Socket = function() {
	this.url = window.location.hostname;
	this.socket = new io.connect('http://'+ this.url);

	return this.socket;
};
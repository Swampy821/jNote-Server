function auth(username, password) {
	this.username = username;
	this.password = password;
}


auth.prototype.login = function(username, password) {
	if(username === this.username && 
		password === this.password) {
		return true;
	}else{
		return false;
	}
}

auth.prototype.addAuthRoute = function(server) {
	var self = this;
	server.route({
		method:'GET',
		path:'/login/{username}/{password}',
		handler: function(request,reply) {
			var username = request.params.username;
			var password = request.params.password;
			reply(self.login(username, password));
		}
	});
	return server;
}

module.exports.auth = auth;
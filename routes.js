function route(obj) {
	this.note = obj.note;
	this.auth = obj.auth;
};

route.prototype.addRoutes = function(server) {
	server = this.note.addNoteRoute(server);
	server = this.note.getNotesRoute(server);
	server = this.note.removeNoteRoute(server);
	server = this.note.getNoteRoute(server);
	server = this.auth.addAuthRoute(server);
	server = this.note.editNoteRoute(server);
	return server;
};


module.exports.route = route;
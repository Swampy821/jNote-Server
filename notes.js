function note() {
	this.notes = [];
};


note.prototype.addNote = function(noteTitle, noteDescription) {
	this.notes.push({title:noteTitle,description:noteDescription, active:true});
	return this.notes.length-1;
};

note.prototype.getNotes = function() {
	return this.notes;
};

note.prototype.removeNote = function(ID) {
	this.notes[ID].active=false;
	return true;
}

note.prototype.getNote = function(ID) {
	return this.notes[ID];
}

note.prototype.addNoteRoute = function(server) {
	var self = this;
	server.route({
		method:'GET',
		path:'/addNote/{noteTitle}/{noteDescription}',
		handler: function(request, reply) {
			var title = request.params.noteTitle;
			var desc = request.params.noteDescription;
			var ID = self.addNote(title, desc);
			reply({id:ID});
		}
	});
	return server;
};
note.prototype.getNotesRoute = function(server) {
	var self = this;
	server.route({
		method:'GET',
		path:'/getNotes',
		handler: function(request, reply) {
			var notes = self.getNotes();
			reply(notes);
		}
	});
	return server;
};
note.prototype.removeNoteRoute = function(server) {
	var self = this;
	server.route({
		method:'GET',
		path:'/removeNote/{ID}',
		handler: function(request, reply) {
			var success = self.removeNote(request.params.ID);
			reply({success:success});
		}
	});
	return server;
};
note.prototype.getNoteRoute = function(server) {
	var self = this;
	server.route({
		method:'GET',
		path:'/getNote/{ID}',
		handler: function(request, reply) {
			var note = self.getNote(request.params.ID);
			reply(note);
		}
	});
	return server;
};
note.prototype.editNote = function(index, title, description) {
	this.notes[index].title = title;
	this.notes[index].description = description;
	return true;
}
note.prototype.editNoteRoute = function(server) {
	var self = this;
	server.route({
		method: 'GET',
		path: '/editNote/{index}/{title}/{description}',
		handler: function(request, reply) {
			var index = request.params.index,
			title = request.params.title,
			description = request.params.description;
			reply(self.editNote(index,title,description));
		}
	});
	return server;
}


module.exports.note = note;
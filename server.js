var Hapi = require('hapi');
var noteObj = require('./notes.js');
var routesObj = require('./routes.js');
var authObj = require('./auth.js');

var note = new noteObj.note();
var auth = new authObj.auth('user','pass');
var routes = new routesObj.route({note:note,auth:auth});
var server = new Hapi.Server(8888);

/*   Add Routes   */
server = routes.addRoutes(server);

server.start(function() {
	console.log('Server started successfully!');
})
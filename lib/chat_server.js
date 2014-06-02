var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = {};
var currentRoom = {};

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
	var name = 'Guest' + guestNumber;
	nickNames[socket.id] = name;

	socket.emit('nameResult', {
		success: true,
		name: name
	});

	namesUsed.push(name);
	return guestNumber + 1;
}

function joinRoom (socket, room) {
	currentRoom[socket.id] = room;

	broadcast.to(room).emit('message', { text: nickNames[socket.id] + 'has joined the room ' + room });

	var usersInRooms = io.socket.client(room);


		if (usersInRooms.length > 1) {

		var usersInRoomsSummary = 'Users currently in room ' + room + ":";
		for (index in usersInRooms) {
			var userSocketID = usersInRooms[index].id;

			if (userSocketID != socket.id) {
				if (index > 0) {
					usersInRoomsSummary += ', ';
				}
			}
			usersInRoomsSummary += nickNames[userSocketID];
		}
	}

	usersInRoomsSummary += '.';

	socket.emit('message', {text: usersInRoomsSummary});


}

function handleMessageBroadcasting(socket, nickNames) {

}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {

}

function handleRoomJoining(socket) {

}

function handleClientDisconnection(socket, nickNames, namesUsed) {

}


function 
exports.listen = function(server) {
	io = socketio.listen(server);
	io.set('log level', 1);

	io.sockets.on('connection', function (socket) {

		guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);

		joinRoom(socket, 'Lobby');

		handleMessageBroadcasting(socket, nickNames);
		handleNameChangeAttempts(socket, nickNames, namesUsed);
		handleRoomJoining(socket);

		socket.on('rooms', function () {
			socket.emit('rooms', io.sockets.manager.rooms);
		});

		handleClientDisconnection(socket, nickNames, namesUsed);


	});
};


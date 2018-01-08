const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const server = http.createServer(app);

const publicPath = path.join(__dirname,'../client');

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage',generateMessage("Admin","Welcome to the chat app"));

    socket.broadcast.emit('newMessage',generateMessage("Admin","New user joined"));

    socket.on('createMessage',(mess,callback) => {
        console.log('new message', mess);
        io.emit('newMessage',generateMessage(mess.from,mess.text)); //send for all user in connection
        callback('this is from the server');

    });
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});

app.use(express.static(publicPath));
const PORT = process.env.NODE_ENV || 8080;

server.listen(PORT,() => {
    console.log('Server is running in port: ' + PORT);
});
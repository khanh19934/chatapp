const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const http = require('http');

const server = http.createServer(app);

const publicPath = path.join(__dirname,'../client');

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage',{
        form:'khanh19934@gmail.com',
        text:'Hey how are you',
        createAt:2234
    });

    socket.on('createMessage',(mess) => {
        console.log('new message', mess);
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
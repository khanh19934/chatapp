const socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
});
socket.on('disconnect', () => {
    console.log('Unable to connect to server');
});
socket.on('newMessage',(mess)=>{
    console.log('newMess',mess);
});
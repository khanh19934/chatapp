const socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
});
socket.on('disconnect', () => {
    console.log('Unable to connect to server');
});

socket.on('newMessage',(mess)=>{
    console.log('adminMess', mess);
    var li = $('<li></li>');
    li.text(`${mess.from}: ${mess.text}`);
    $("#messages").append(li);
});


$('#message-form').on('submit',(e) => {
    e.preventDefault();

    socket.emit('createMessage',{
        from:"User",
        text:$('[name=message]').val()
    },()=>{

    });
});

socket.on('newLocationMessage',(message)=>{
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $("#messages").append(li);
});

$('#send-location').on('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }else{
        navigator.geolocation.getCurrentPosition((position)=>{
            socket.emit('createLocationMessage',{
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            });
        },()=>{
            alert('Unable to fetch location');
        })
    }
});
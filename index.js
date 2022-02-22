//Node Server for socket io
//solves the problem from cors
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const users = {};


io.on('connection', socket => {
    //if any new user jonis let other users connected to the server know.
    socket.on('new-user-joined', name => {
        users[socket.id] = name; //gives user the key and assign the name as the key
        socket.broadcast.emit('user-joined', name);//emits the event to everyone except for the person who joined.
    });

   //If someone leaves the chat let others know.
    socket.on('send' , message =>{
        socket.broadcast.emit('recieve' , {message: message , name: users[socket.id]})
    })

    socket.on('disconnect' , message =>{
        socket.broadcast.emit('left' ,  users[socket.id]);
        delete users[socket.id];

    })
});

module.exports = {
    connect: function(io, PORT){
        io.on('connection', (socket) => { 
            console.log("User connection on port" + PORT + ' : ' + socket.id);

            socket.on('joinRoom', (room, username)=> {
                socket.join(room);
                io.in(room).emit('joinNoti', username +" has joined the chat");
                
            });

            socket.on('message', ({message, room})=> {
                io.in(room).emit('message', message);
                
            })
        });
    }
}
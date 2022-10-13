module.exports = {
    connect: function(io, PORT){
        const {getRoom} = require('./server.js')
        io.on('connection', (socket) => { 
            console.log("User connection on port" + PORT + ' : ' + socket.id);

            socket.on('joinRoom', (room)=> {
                socket.join(room);
            });

            socket.on('message', ({message, room})=> {
                io.in(room).emit('message', message);
            })
        });
    }
}
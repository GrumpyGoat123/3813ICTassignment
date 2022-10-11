module.exports = {
    connect: function(io, PORT){
        io.on('connection', (socket) => { //Something wrong here
            console.log("User connection on port" + PORT + ' : ' + socket.id);

            socket.on('message', (message)=> {
                io.emit('message', message);
            })
        });
    }
}
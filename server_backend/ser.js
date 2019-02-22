//checking for events. connecton will be listening for incoming sockets.
io.on('connection', function(socket) {
    console.log("Connected socket!");
//started listening events. socket.on waits for the event. whenever that event is triggered the callback
//function is called.
    socket.on('createMessage', function(message) {
        //saving message to db
        chatController.message(message, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(message + " in server")
                //io.emmit is used to emit the message to all sockets connected to it.
                io.emit('newMessageSingle', message);
            }
        })
        // socket emmits disconnect event which will be called whenever client disconnected.
        socket.on('disconnect', function() {
            console.log("Socket Disconnected!")
        });
    });
});
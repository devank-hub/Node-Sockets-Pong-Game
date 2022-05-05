let readyPlayerCount = 0;

function listen(io) {
    io.on('connection', (socket) => {
        let room = 'room' + Math.floor(readyPlayerCount / 2);
        console.log(`Client connected: ${socket.id}`);
        
        socket.on('ready', () => {
            
            socket.join(room);

            console.log(`Player ready: ${socket.id} in room: ${room}`);
            readyPlayerCount++;
    
            if (readyPlayerCount % 2 === 0) {
                io.in(room).emit('startGame', socket.id);
            }
        })
    
        socket.on('paddleMove', (paddledata) => {
            // console.log(`Client moved: ${socket.id}`);
            socket.to(room).emit('paddleMove', paddledata);
        });
    
        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove', ballData);
        });
    
        socket.on('disconnect', (reason) => {
            console.log(`Client disconnected: ${socket.id} and reason: ${reason}`);
            socket.leave(room);
        });
    });
}

export {
    listen,
}
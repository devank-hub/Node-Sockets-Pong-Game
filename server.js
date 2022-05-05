import http from 'http';
import { api } from './api.js';
import { Server } from 'socket.io';
import * as sockets from './socketserv.js';

const PORT = process.env.PORT || 3000;

//http server
const httpserver = http.createServer(api);
httpserver.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//socket server
const socketServer = new Server(httpserver,{
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
sockets.listen(socketServer);

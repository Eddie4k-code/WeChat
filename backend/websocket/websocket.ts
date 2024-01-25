import {Server} from 'socket.io';
import { Server as HttpServer } from 'http';

/*
I am going to use singleton design patter,
so that there is one instance of web socket shared across the backend.
*/

const WEBSOCKET_CORS = {
    origin: "*",
    methods: ["GET", "POST"]
}


class Websocket extends Server {

    private static io: Websocket;

    constructor(httpServer: HttpServer) {
        super(httpServer, {
            cors: WEBSOCKET_CORS
        });
        
    }

    //Will either retireve or create an instance of Websocket
    public static getInstance(httpServer: HttpServer) {
        if (!this.io) {

            this.io = new Websocket(httpServer);

        }

        return this.io;
    }

}

export default Websocket;
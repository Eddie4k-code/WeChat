import {io} from 'socket.io-client';

const webSocket = io("http://localhost:5000");

export default webSocket;
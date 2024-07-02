import { Server, Socket } from "socket.io";

export function socketIoHandler(socket: Socket, io: Server) {
    let timeOut = setTimeout(() => {
        socket.disconnect()
    }, 10000);

    // ping
    socket.on('ping', (data) => {
        console.log("PONG!")
        clearTimeout(timeOut)
    })

}
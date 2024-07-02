import { io } from "socket.io-client";
import express from "express"

const URL = "http://127.0.0.1:3000";

const app = express()
app.listen(8080, "127.0.0.1", () => {
    console.log(`Client Started`)

    const socket = io(URL, { autoConnect: true, path: "/websocket" });
    socket.on("connect", () => {
        console.log("Connected:", socket.connected); // true
        socket.emit("chat message", {
            message: "cobain text"
        })

        console.log("message sent")
    });

    socket.on("disconnect", () => {
        console.log("Disconnected:", socket.connected); // false
    });

    socket.on("connect_error", (err: any) => {
        console.log(err)
    });

})

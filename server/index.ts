import fastify from "fastify";
import { Server } from "socket.io";

const server = fastify({
    logger: {
        transport: {
            target: "pino-pretty"
        }
    },
})

declare module 'fastify' {
    interface FastifyInstance {
        io: Server
    }
}

async function main() {
    try {
        const io = new Server(server.server, {
            path: '/websocket',
            cors: {
                origin: 'http://localhost:8080',
                methods: ['GET', 'POST'],
            }
        })
        server.decorate("io", io)
        server.addHook("onClose", (server) => {
            server.io.close();
        });

        server.io.on("connection", (socket) => {
            console.log("Client is connected")

            socket.on("chat message", (msg) => {
                console.log({ msg })
            })
        })

        server.listen({ host: "0.0.0.0", port: 3000 }, (err, address) => {
            if (err) {
                console.log({ err })
            }
            console.log(`Fastify server is listening on ${address}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()
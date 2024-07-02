import fp from "fastify-plugin"
import { Server, ServerOptions } from "socket.io"
import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from "fastify";


declare module 'fastify' {
    interface FastifyInstance {
        io: Server
    }
}

const fastifySocketIO: FastifyPluginAsync<Partial<ServerOptions>> = fp(
    async function (fastify, _opts) {
        const io = new Server(fastify.server, {
            path: '/websocket',
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
                credentials: true
            },
            transports: ['websocket']
        })

        fastify.decorate("io", io);

        fastify.addHook("onClose", (instance) => {
            instance.io.close();
        });
    }
)

export default fp(async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    await fastify.register(fastifySocketIO);
});

import fp from "fastify-plugin"
import { Server } from 'socket.io'
import { createAdapter } from '@socket.io/mongo-adapter'
import { socketMiddleware } from "./middleware"
import { onConnection } from "./connection"
import { mongoose } from "@typegoose/typegoose"
import { COLLECTIONS } from "../constants/collections"

async function pl(instance, options, next) {
    const io = new Server(instance.server, { ...options, cors: true, })

    const collection = mongoose.connection.db.collection(COLLECTIONS.CHILD_APPS_USE_HISTORY)
    io.adapter(createAdapter(collection)) //?

    io
        .use((socket, done) => socketMiddleware(socket, done, instance))
        .on('connection', onConnection)

    instance.decorate('io', io)
    next()
}

export const socketPlugin = fp(pl)

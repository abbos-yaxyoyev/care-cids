import fp from "fastify-plugin"
import mongoose from 'mongoose'
import { ENV } from "../config"

async function connect() {
    try {
        mongoose.set('debug', true)
        await mongoose.connect(`${ENV.DB_URL}?replicaSet=${ENV.DB_REPLICA_SET}`)
        console.log('db connected')
    } catch (e) {
        console.log('e: ' + e.message);
        process.exit(1)
    }
}

async function pl(instance, options, next) {
    await connect()
    next()
}

export const dbPlugin = fp(pl)
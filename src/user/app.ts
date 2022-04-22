
import { ENV } from '../common/config'
import fastify from 'fastify'
import FastifyCors from 'fastify-cors'
import { dbPlugin } from '../common/db/db'
import { authPlugin } from '../middleware/authentication'
import { replyDecorator } from '../common/decorators/reply.decorator'
import { routesPlugin } from './routes'
import { socketPlugin } from '../common/socket/plugin'

const server = fastify(
    {
        logger: true
    }
)

server.register(FastifyCors, {
    origin: true
})

server.register(dbPlugin)
server.register(authPlugin)
server.register(replyDecorator)
server.register(routesPlugin)
server.register(socketPlugin)

async function start() {
    try {
        const options = {
            host: ENV.HOST,
            port: ENV.PORT
        }

        await server.listen(options)
        server.log.info(server.route)
        server.log.info('Started successfully')
    } catch (error) {
        console.log("error start(): ", error)
        process.exit(1)
    }
}

start()

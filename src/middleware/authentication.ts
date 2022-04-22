import fastifyJWT from "fastify-jwt"
import fp from "fastify-plugin"
import { ENV } from "../common/config"
import { childrenService } from "../common/service/children/children.service"
import { userService } from "../common/service/user/user.service"

export async function getDecodedFromDb(decoded) {
    const { userId, uuid } = decoded
    if (userId)
        return {
            type: 'user',
            user: await userService.findByIdError(userId)
        }
    else
        return {
            type: 'children',
            user: await childrenService.findByUuid(decoded)
        }

}

export async function authenticate_user(request, reply) {
    try {
        const decoded = await request.jwtVerify();
        const { type, user } = await getDecodedFromDb(decoded)
        request.user = user
        request.type = type
    } catch (error) {
        return reply.status(401).send({
            code: 401,
            statusCode: 401,
            message: "Authorization failed",
        })
    }
}

export async function authenticate_child(request, reply) {
    try {
        const uuid = request.headers['authorization'].split(' ')[1];
        const { type, user } = await getDecodedFromDb(uuid)
        request.user = user
        request.type = type
    } catch (error) {
        return reply.status(401).send({
            code: 401,
            statusCode: 401,
            message: "Authorization failed",
        })
    }
}

export async function authenticate(request, reply) {
    const header = request.headers['authorization'].split(' ')[1];
    console.log("header: " + header);

    if (header.length == 5) {
        await authenticate_child(request, reply)
    } else {
        await authenticate_user(request, reply)
    }
}

async function auth(instance, options, next) {

    instance.register(fastifyJWT, {
        secret: ENV.JWT_SECRET,
        sign: {
            expiresIn: ENV.JWT_EXPIRE,
        }
    })

    instance.addHook('onRequest', function (request, reply, done) {
        request.instance = instance
        request.language = request.headers['Accept-Language']
        done()
    })

    next()
}

export const authPlugin = fp(auth);

export function jwtSign(request, params) {
    return request.instance.jwt.sign(params)
}

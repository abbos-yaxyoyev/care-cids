import fp from "fastify-plugin"
import { CommonException } from "../constants/exceptions"

async function pl(instance, options, next) {

    instance.decorateReply("success", function (result: any = 'ok') {
        this.status(200).send({
            code: 0,
            message: 'Success',
            data: result,
        })
    })

    // global error handler
    instance.setErrorHandler((error, _request, reply) => {
        if (error instanceof CommonException) {
            reply.status(400).send(error)
        }
        else {
            console.log("error2: ", error);
            reply.send(error)
        }
    })


    next()
}

export const replyDecorator = fp(pl)
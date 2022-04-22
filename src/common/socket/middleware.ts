import { getDecodedFromDb } from "../../middleware/authentication"

export async function socketMiddleware(socket, next, instance) {

    try {
        const token = socket.handshake?.headers['authorization']?.replace('Bearer ', '');
        let decoded: any = token;
        if (token.length != 5) {
            decoded = instance.jwt.decode(token)
        }
        if (!token || !decoded) {
            console.log("token : " + token);
            throw { message: 'unauth' }
        }
        console.log("token : " + token);
        const { user, type } = await getDecodedFromDb(decoded)
        socket.user = user
        socket.type = type
        next()
    }
    catch (error) {
        return next(new Error(error?.message || 'Unauth'))
    }
}

import { authenticate_user } from "../../../middleware/authentication"
import { profileHandler, signInHandler, signUpHandler, signVerifyHandler } from "../../handlers/user.handler"

export const userRoutes = [
    {
        method: 'POST',
        url: '/sign-up',
        handler: signUpHandler
    },
    {
        method: 'POST',
        url: '/sign-in',
        handler: signInHandler
    },
    {
        method: 'POST',
        url: '/sign-verify',
        handler: signVerifyHandler
    },
    {
        method: 'GET',
        url: '/profile',
        preValidation: [authenticate_user],
        handler: profileHandler
    }
]
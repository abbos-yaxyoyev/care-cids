import { authenticate_user, authenticate_child } from "../../../middleware/authentication"
import { childFirebaseHandler, userFirebaseHandler } from "../../handlers/firebase/handler"

export const firebaseRoutes = [
    {
        method: 'POST',
        url: '/user/firebase-token',
        preValidation: [authenticate_user],
        handler: userFirebaseHandler
    },
    {
        method: 'POST',
        url: '/children/firebase-token',
        preValidation: [authenticate_child],
        handler: childFirebaseHandler
    }
]
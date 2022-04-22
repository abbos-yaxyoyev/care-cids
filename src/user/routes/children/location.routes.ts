import { authenticate_child } from "../../../middleware/authentication"
import { childrenSetLocationHandler } from "../../handlers/children/location.handler"

export const childrenLocation = [
    {
        method: 'POST',
        path: '/children-location',
        preValidation: [authenticate_child],
        handler: childrenSetLocationHandler
    }
]
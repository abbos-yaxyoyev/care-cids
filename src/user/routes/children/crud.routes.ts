import { authenticate_user, authenticate_child } from "../../../middleware/authentication"
import { childrenCreateHandler, childrenDeleteHandler, childrenGetByIdHandler, childrenGetHandler, childrenUpdateHandler } from "../../handlers/children/crud.handler"

export const childrenRoutes = [
    {
        method: 'POST',
        url: '/children',
        preValidation: [authenticate_user],
        handler: childrenCreateHandler
    },
    {
        method: 'PUT',
        url: '/children',
        preValidation: [authenticate_user],
        handler: childrenUpdateHandler
    },
    {
        method: 'DELETE',
        url: '/children/:_id',
        preValidation: [authenticate_user],
        handler: childrenDeleteHandler
    },
    {
        method: 'GET',
        url: '/children',
        preValidation: [authenticate_user],
        handler: childrenGetHandler
    },
    {
        method: 'GET',
        url: '/children/:_id',
        preValidation: [authenticate_user],
        handler: childrenGetByIdHandler
    }
]
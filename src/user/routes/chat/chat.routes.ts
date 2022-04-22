import { authenticate } from "../../../middleware/authentication";
import {
    updateOneMessageHendler,
    deleteOneMessageHendler,
    pagenationMessageHendler,
    createMessageHendler
} from "../../handlers/chat/chat.hendler";

export const chatRoutes = [
    {
        method: 'POST',
        url: '/chat/create',
        preValidation: [authenticate],
        handler: createMessageHendler
    },
    {
        method: 'PUT',
        url: '/chat/updateOne',
        preValidation: [authenticate],
        handler: updateOneMessageHendler
    },
    {
        method: 'PUT',
        url: '/chat/deleteOne',
        preValidation: [authenticate],
        handler: deleteOneMessageHendler
    },
    {
        method: 'PUT',
        url: '/chat/aggregate',
        preValidation: [authenticate],
        handler: pagenationMessageHendler
    }
]

import {childrenSignHandler} from "../../handlers/children/sign.handler"

export const childrenSign = [
    {
        method: 'POST',
        url: '/children-sign',
        handler: childrenSignHandler
    }
]
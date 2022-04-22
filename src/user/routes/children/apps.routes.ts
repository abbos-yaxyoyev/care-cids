import { authenticate_user, authenticate_child } from "../../../middleware/authentication"
import { childAppsGetHandler, childrenAppSetLimitGetHandler, childrenAppsGetHandler, syncChildAppsHandler } from "../../handlers/children/apps.handler"

export const childrenAppRoutes = [
    {
        method: 'POST',
        url: '/children/apps-usage',
        preValidation: [authenticate_child],
        handler: syncChildAppsHandler
    },
    {
        method: 'GET',
        url: '/children/apps',
        preValidation: [authenticate_child],
        handler: childAppsGetHandler
    },
    // for parent
    {
        method: 'POST',
        url: '/children/apps',
        preValidation: [authenticate_user],
        handler: childrenAppsGetHandler
    },
    {
        method: 'POST',
        url: '/children/app/set-limit',
        preValidation: [authenticate_user],
        handler: childrenAppSetLimitGetHandler
    }
]
import fp from "fastify-plugin"
import { childrenAppRoutes } from "./children/apps.routes"
import { childrenRoutes } from "./children/crud.routes"
import { childrenLocation } from "./children/location.routes"
import { childrenSign } from "./children/sign.routes"
import { firebaseRoutes } from "./firebase/routes"
import { userRoutes } from "./user/routes"
import { chatRoutes } from "./chat/chat.routes"

const routes = [
    ...userRoutes,
    ...childrenRoutes,
    ...childrenSign,
    ...childrenLocation,
    ...childrenAppRoutes,
    ...firebaseRoutes,
    ...chatRoutes,
]

export async function pl(instance, _, next) {
    try {
        routes.map(
            route => instance.route(route)
        )
    }
    catch (error) {
        console.log("error routes: ", error)
        process.exit(1)
    }

    next()
}

export const routesPlugin = fp(pl)
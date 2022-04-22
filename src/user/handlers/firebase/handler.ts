import {childrenService} from "../../../common/service/children/children.service"
import {userService} from "../../../common/service/user/user.service"

export async function userFirebaseHandler(request, reply) {
    const {firebase_token} = request.body
    await userService.updateOne(request.user._id, {firebase_token})
    return reply.success()
}

export async function childFirebaseHandler(request, reply) {
    const {firebase_token} = request.body
    await childrenService.updateOne(request.user._id, {firebase_token})
    return reply.success()
}
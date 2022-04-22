import {ChildrenException} from "../../../common/db/models/children/exception"
import {jwtSign} from "../../../middleware/authentication"
import {childrenService} from "../../../common/service/children/children.service"

export async function childrenSignHandler(request, reply) {
    const {uuid} = request.body
    const children = await childrenService.findOne({uuid})
    if (!children) throw ChildrenException.NotFound(uuid)
    const token = jwtSign(request, {uuid: uuid})
    return reply.success({token})
}
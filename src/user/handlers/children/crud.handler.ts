import { Types } from "mongoose"
import { ChildrenException } from "../../../common/db/models/children/exception"
import { childrenService } from "../../../common/service/children/children.service"
import { CommonDtoGroup } from "../../../common/validation/common.dto"
import { ChildrenDto } from "../../../common/validation/dto/children.dto"
import { validateIt } from "../../../common/validation/validate"
import { childrenRoutes } from "../../routes/children/crud.routes" //?

export async function childrenCreateHandler(request, reply) {
    const data = await validateIt(request.body, ChildrenDto, CommonDtoGroup.CREATE)
    data.parentId = request.user._id
    const child = await childrenService.createChild(data)
    const childResponse = await validateIt(child.toObject(), ChildrenDto, CommonDtoGroup.RESPONSE) //?
    return reply.success(childResponse)
}

export async function childrenUpdateHandler(request, reply) {
    const data = await validateIt(request.body, ChildrenDto, [CommonDtoGroup.CREATE, CommonDtoGroup.UPDATE])

    const child = await childrenService.updateOne(data._id, data)
    if (!child) throw ChildrenException.NotFound(data._id)
    const childResponse = await validateIt(child.toObject(), ChildrenDto, CommonDtoGroup.RESPONSE) //?
    return reply.success(childResponse)
}

export async function childrenDeleteHandler(request, reply) {
    const data = await validateIt(request.params, ChildrenDto, [CommonDtoGroup.DELETE])
    await childrenService.updateOne(data._id, { deletedAt: new Date() })
    return reply.success(data._id)
}

export async function childrenGetHandler(request, reply) {
    const children = await childrenService.parentChildren(request.user._id)
    return reply.success(children)
}

export async function childrenGetByIdHandler(request, reply) {
    const data = await validateIt(request.params, ChildrenDto, CommonDtoGroup.GET_BY_ID)
    const child = await childrenService.findById(data._id)
    if (!child) throw ChildrenException.NotFound(data._id)
    const childrenResponse = await validateIt(child.toObject(), ChildrenDto, CommonDtoGroup.RESPONSE)
    return reply.success(childrenResponse)
}
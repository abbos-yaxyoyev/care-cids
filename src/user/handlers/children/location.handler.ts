import { childrenService } from "../../../common/service/children/children.service"
import { locationService } from "../../../common/service/children/location.service"
import { CommonDtoGroup } from "../../../common/validation/common.dto"
import { LocationDto } from "../../../common/validation/dto/children.dto"
import { validateIt } from "../../../common/validation/validate"

export async function childrenSetLocationHandler(request, reply) {
    const data = await validateIt(request.body, LocationDto, CommonDtoGroup.CREATE)
    const locationParams = {
        childId: request.user._id,
        ...data,
        date: new Date()
    }
    const { _id } = await locationService.create(locationParams) //?
    await childrenService.updateOne(request.user._id, data)
    reply.success(_id)
}
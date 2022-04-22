import { childrenService } from "../service/children/children.service"
import { locationService } from "../service/children/location.service"
import { userService } from "../service/user/user.service"
import { CommonDtoGroup } from "../validation/common.dto"
import { LocationDto } from "../validation/dto/children.dto"
import { ChatDtoGroup, ChatDto } from "../validation/dto/chatHistory.dto"
import { ChatHistoryException } from "../db/models/chatHistory/exception"
import { chatHistoryService } from "../service/chatHistory/chatHistory.service"
import { validateIt } from "../validation/validate"
import { socketEmitter } from "./emitter"

export async function locationChangeHandle(socket, data) {
    const child = socket.user
    const validated = await validateIt(data, LocationDto, CommonDtoGroup.CREATE)
    const locationParams = {
        childId: child._id,
        ...validated,
        date: new Date()
    }
    await locationService.create(locationParams)
    await childrenService.updateOne(child._id, validated)
    const locationData = {
        childId: child._id,
        location: validated
    }
    await socketEmitter.emitUser('locationChange', locationData, child.parentId)
}

export async function editMessage(emit: string, type: string, user_id: string, data: object) {
    try {
        switch (type) {
            case 'user': {
                socketEmitter.emitChild(emit, data, user_id)
                break
            }
            case 'children': {
                socketEmitter.emitUser(emit, data, user_id)
                break
            }
            default:
                return
        }

    } catch (error) {
        console.log("editMessage: ", error);
        throw ChatHistoryException.UnknownError(error)
    }
}

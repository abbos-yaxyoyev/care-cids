import { ChatDtoGroup, ChatDto } from "../../../common/validation/dto/chatHistory.dto";
import { chatHistoryService } from "../../../common/service/chatHistory/chatHistory.service";
import { ChatHistoryException } from "../../../common/db/models/chatHistory/exception";
import { childrenService } from "../../../common/service/children/children.service";
import { editMessage } from "../../../common/socket/handlers";
import { validateIt } from "../../../common/validation/validate";
import { Types } from "mongoose";

export async function createMessageHendler(request, reply) {
    const data = await validateIt(request.body, ChatDto, [ChatDtoGroup.CREATE])
    let child: any
    if (request.type == 'user') {
        child = await childrenService.findOne({ parentId: request.user._id, _id: data.childId });
    } else {
        child = await childrenService.findOne({ _id: request.user._id });
    }

    const createMessage = {
        childId: new Types.ObjectId(child._id),
        parentId: new Types.ObjectId(child.parentId),
        message: data.message
    }

    const { message, childId, parentId, createdAt, _id } = await chatHistoryService.create(createMessage);

    let sendMessage: any = { _id, createdAt, message };
    let user_id: string = parentId.toString();
    if (request.type == 'user') {
        sendMessage.childId = childId
        user_id = childId.toString();
    }

    editMessage('chatMessage', request.type, user_id, sendMessage);
    return reply.success(sendMessage)
}

export async function deleteOneMessageHendler(request, reply) {
    const data = await validateIt(request.body, ChatDto, [ChatDtoGroup.GET_BY_ID])
    console.log("data: ", data);
    let child: any
    if (request.type == 'user') {
        child = await childrenService.findOne({ parentId: request.user._id, _id: data.childId });
    } else {
        child = await childrenService.findOne({ _id: request.user._id });
    }
    const query = {
        childId: new Types.ObjectId(child._id),
        parentId: new Types.ObjectId(child.parentId),
        _id: new Types.ObjectId(data._id),
        deletedAt: null
    }

    const chat = await chatHistoryService.updateOneByQuery(query, { deletedAt: Date.now() }, { new: true });

    if (!chat) {
        throw ChatHistoryException.NotFound(chat)
    }

    let obj: any = { _id: chat._id };
    let user_id: string = chat.parentId.toString();
    if (request.type == 'user') {
        obj.childId = chat.childId
        user_id = chat.childId.toString();
    }
    editMessage('delete', request.type, user_id, obj)
    return reply.success(chat)
}

export async function updateOneMessageHendler(request, reply) {
    const data = await validateIt(request.body, ChatDto, [ChatDtoGroup.UPDATE])
    let child: any
    if (request.type == 'user') {
        child = await childrenService.findOne({ parentId: request.user._id, _id: data.childId });
    } else {
        child = await childrenService.findOne({ _id: request.user._id });
    }
    const query = {
        childId: new Types.ObjectId(child._id),
        parentId: new Types.ObjectId(child.parentId),
        _id: new Types.ObjectId(data._id),
        deletedAt: null
    }
    const chat = await chatHistoryService.updateOneByQuery(query, { message: data.message }, { new: true });
    console.log("chat: ", chat);

    if (!chat) {
        throw ChatHistoryException.NotFound(chat)
    }

    let obj: any = { message: chat.message, updateAt: chat.updatedAt }
    let user_id: string = chat.parentId.toString();
    if (request.type == 'user') {
        obj.childId = chat.childId;
        user_id = chat.childId.toString();
    }
    editMessage('edit', request.type, user_id, obj)
    return reply.success({ message: chat.message, updateAt: chat.updatedAt })
}
export async function pagenationMessageHendler(request, reply) {
    const data = await validateIt(request.body, ChatDto, [ChatDtoGroup.NUMBER])

    let child: any
    if (request.type == 'user') {
        child = await childrenService.findOne({ parentId: request.user._id, _id: data.childId });
    } else {
        child = await childrenService.findOne({ _id: request.user._id });
    }
    const query = {
        childId: child._id,
        parentId: child.parentId,
        deletedAt: null
    }

    const chats = await chatHistoryService.pagenationMessage(data.pagenation, query);
    if (chats.length === 0) {
        throw ChatHistoryException.NotFound('message not found');
    }
    return reply.success(chats)
}




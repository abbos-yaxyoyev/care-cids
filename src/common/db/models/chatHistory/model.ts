import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose"
import { Types } from "mongoose"
import { COLLECTIONS } from "../../../constants/collections"
import { CommonModel } from "../common.model"
import { User } from "../user/model"
import { Children } from "../children/model"

@modelOptions({
    schemaOptions: {
        collection: COLLECTIONS.CHAT_HISTORY
    }
})
@index(
    {
        childId: 1,
        parentId: 1,
        deletedAt: 1
    },
    {
        name: 'Chat',
        background: true,
    }
)

export class ChatHistory extends CommonModel {

    @prop({ type: Types.ObjectId, ref: COLLECTIONS.CHILDREN })
    childId: Ref<Children>

    @prop({ required: true })
    message: string

    @prop({ type: Types.ObjectId, ref: COLLECTIONS.USERS })
    parentId: Ref<User>
}

export const ChatHistoryModel = getModelForClass(ChatHistory)
import {getModelForClass, index, modelOptions, prop, Ref} from "@typegoose/typegoose"
import {Types} from "mongoose"
import {COLLECTIONS} from "../../../constants/collections"
import {CommonModel} from "../common.model"
import {User} from "../user/model"

@modelOptions({
    schemaOptions: {
        collection: COLLECTIONS.CHILDREN
    }
})
@index(
    {
        uuid: 1
    },
    {
        name: 'Uuid',
        background: true,
        unique: true,
        partialFilterExpression: {
            deletedAt: null
        }
    }
)

@index(
    {
        parentId: 1
    },
    {
        name: 'Parent',
        background: true
    }
)
export class Children extends CommonModel {
    @prop({required: true})
    uuid: string

    @prop({required: true})
    name: string

    @prop({required: true})
    birthdate: string

    @prop({type: Types.ObjectId, ref: COLLECTIONS.USERS})
    parentId: Ref<User>

    @prop()
    latitude: number
    @prop()
    longitude: number

    @prop({default: null})
    firebase_token?: string
}

export const ChildrenModel = getModelForClass(Children)
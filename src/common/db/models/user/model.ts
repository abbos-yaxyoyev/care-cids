import {getModelForClass, index, modelOptions, prop} from "@typegoose/typegoose"
import {COLLECTIONS} from "../../../constants/collections"
import {Languae} from "../../../constants/language"
import {CommonModel} from "../common.model"

@modelOptions({
    schemaOptions: {
        collection: COLLECTIONS.USERS
    }
})
@index(
    {phoneNumber: 1},
    {
        name: 'phoneNumber',
        background: true,
        unique: true,
        partialFilterExpression: {
            deletedAt: null
        }
    }
)
export class User extends CommonModel {
    @prop({default: ''})
    name: string

    @prop()
    phoneNumber: string

    @prop({default: Languae.UZ})
    language: Languae

    @prop({default: null})
    otp: string

    @prop({default: null})
    firebase_token?: string
}
export const UserModel = getModelForClass(User)
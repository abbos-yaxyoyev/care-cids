import {getModelForClass, index, modelOptions, prop, Ref} from "@typegoose/typegoose"
import {Types} from "mongoose"
import {COLLECTIONS} from "../../../constants/collections"
import {Children} from "../children/model"

@modelOptions({
    schemaOptions: {
        collection: COLLECTIONS.CHILD_APPS
    }
})
@index(
    {
        childId: 1
    },
    {
        background: true,
        name: 'Children'
    }
)
export class ChildApp {
    @prop({type: Types.ObjectId, ref: COLLECTIONS.CHILDREN})
    childId: Ref<Children>
    @prop()
    name: string
    @prop({default: null})
    usageLimit: number // by minutes
}
export const ChildAppModel = getModelForClass(ChildApp)
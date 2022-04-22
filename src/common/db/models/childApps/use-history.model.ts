import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose"
import {Types} from "mongoose"
import {COLLECTIONS} from "../../../constants/collections"
import {Children} from "../children/model"
import {CommonModel} from "../common.model"
import {ChildApp} from "./model"

@modelOptions({
    schemaOptions: {
        collection: COLLECTIONS.CHILD_APPS_USE_HISTORY
    }
})
export class ChildAppUseHistory extends CommonModel {

    @prop({type: Types.ObjectId, ref: COLLECTIONS.CHILDREN})
    childId: Ref<Children>

    @prop({type: Types.ObjectId, ref: COLLECTIONS.CHILD_APPS})
    appId: Ref<ChildApp>

    @prop({default: 0})
    usage: number

    @prop({required: true})
    date: Date
}
export const ChildAppUseHistoryModel = getModelForClass(ChildAppUseHistory)
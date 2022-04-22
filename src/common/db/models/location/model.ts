
import {getModelForClass, index, modelOptions, prop, Ref} from "@typegoose/typegoose"
import {Types} from "mongoose"
import {COLLECTIONS} from "../../../constants/collections"
import {Children} from "../children/model"

@modelOptions({
    schemaOptions: {
        collection: COLLECTIONS.LOCATIONS
    }
})
@index(
    {
        childId: 1
    },
    {
        name: 'Childrend',
        background: true
    }
)
export class Location {

    @prop({type: Types.ObjectId, ref: COLLECTIONS.CHILDREN})
    childId: Ref<Children>

    @prop()
    latitude: number

    @prop()
    longitude: number

    @prop()
    date: Date
}

export const LocationModel = getModelForClass(Location)
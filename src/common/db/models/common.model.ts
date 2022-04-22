
import { index, modelOptions, pre, prop } from "@typegoose/typegoose"

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
@index(
    {
        deletedAt: 1
    },
    {
        name: 'forDeleted',
        background: true,
        partialFilterExpression: {
            deletedAt: {
                $eq: null
            }
        }
    }
)
@pre<CommonModel>('save', function () {
    this.deletedAt = null
})
@pre<CommonModel>('findOneAndUpdate', function () {
    this.where({ deletedAt: null })
})
@pre<CommonModel>('updateOne', function () {
    this.where({ deletedAt: null })
})
@pre<CommonModel>('countDocuments', function () {
    this.where({ deletedAt: null })
})
@pre<CommonModel>('aggregate', function () {
    this.pipeline().unshift({ $match: { deletedAt: null } })
})
@pre<CommonModel>('findOne', function () {
    this.where({ deletedAt: null })
})
@pre<CommonModel>('find', function () {
    this.where({ deletedAt: null })
})
export class CommonModel {
    createdAt: Date
    updatedAt: Date
    @prop({ default: null })
    deletedAt?: Date
}
import { ModelType } from "@typegoose/typegoose/lib/types"
import { QueryOptions, SaveOptions } from "mongoose"
import { CommonException } from "../constants/exceptions"

export class CommonServices<T> {
    constructor(public model: ModelType<T>) { }
    public async count<T>(query) {
        try { return await this.model.countDocuments(query) }
        catch (error) { throw CommonException.UnknownError(error) }
    }
    public async find<T>(query, options?: QueryOptions, projection?: any) {
        try { return await this.model.find(query, projection, options) }
        catch (error) { throw CommonException.UnknownError(error) }
    }
    public async findOne<T>(query, options?: QueryOptions, projection?: any) {
        try { return await this.model.findOne(query, projection, options) }
        catch (error) { throw CommonException.UnknownError(error) }
    }
    public async findById<T>(id: string, options?: QueryOptions, projection?: any) {
        try { return await this.model.findById(id, projection, options) }
        catch (error) { throw CommonException.UnknownError(error) }
    }
    public async create<T>(data, options?: SaveOptions) {
        try {
            data.deletedAt = null
            const saved = await this.model.create([data], options)
            return await this.model.findById(saved[0]._id, options)
        }
        catch (error) {
            throw CommonException.UnknownError(error)
        }
    }
    public async updateOne<T>(id, data, options?: QueryOptions) {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, options)
            return await this.model.findById(id)
        }
        catch (error) {
            throw CommonException.UnknownError(error)
        }
    }
    public async updateOneByQuery<T>(query, data, options?: QueryOptions) {
        try {
            return await this.model.findOneAndUpdate(query, data, options)
        }
        catch (error) {
            throw CommonException.UnknownError(error)
        }
    }
    public async aggregate<T>(pipeline) {
        try {
            return await this.model.aggregate(pipeline)
        }
        catch (error) {
            throw CommonException.UnknownError(error)
        }
    }
}
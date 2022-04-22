import {ModelType} from "@typegoose/typegoose/lib/types"
import {CommonException} from "../../../constants/exceptions"
import {ChildApp, ChildAppModel} from "../../../db/models/childApps/model"
import {CommonServices} from "../../common.service"

class ChildAppService extends CommonServices<ChildApp> {
    constructor(model: ModelType<ChildApp>) {super(model)}
    public async findByNameAndUpdate(data) {
        try {
            return await this.model.findOneAndUpdate(
                {name: data.name, childId: data.childId},
                {$set: data},
                {upsert: true, new: true}
            )
        }
        catch (error) {throw CommonException.UnknownError(error)}
    }
    public async getChildApps(childId) {
        return await this.find({childId}, {}, {name: 1, usageLimit: 1})
    }
}

export const childAppService = new ChildAppService(ChildAppModel)
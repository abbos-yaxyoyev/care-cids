import { ModelType } from "@typegoose/typegoose/lib/types"
import { CommonException } from "../../constants/exceptions"
import { ChildrenException } from "../../db/models/children/exception"
import { Children, ChildrenModel } from "../../db/models/children/model"
import { UserException } from "../../db/models/user/exception"
import { User, UserModel } from "../../db/models/user/model"
import { generateOtp, sendOtp } from "../../helpers/otp.helper"
import { generateUuid } from "../../helpers/uuid.helper"
import { CommonServices } from "../common.service"

class ChildrenService extends CommonServices<Children> {
    constructor(model: ModelType<Children>) { super(model) }
    public async createChild(data, retryCount = 0) {
        if (retryCount > 3) {
            throw CommonException.UnknownError('could not save')
        }
        data.uuid = generateUuid()
        const exist = await this.findOne({ uuid: data.uuid })
        if (exist) await this.createChild(data, retryCount + 1)
        return await this.create(data)
    }
    public async parentChildren(parentId) {
        const $match = {
            $match: { parentId }
        }
        const $project = {
            $project: {
                name: 1,
                uuid: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
        const pipeline = [
            $match,
            $project
        ]
        return await this.aggregate(pipeline)
    }
    public async countChildren(parentId) {
        return await this.count({ parentId })
    }
    public async findByUuid(uuid) {
        const child = await this.findOne({ uuid })
        if (!child) throw ChildrenException.NotFound(uuid)
        return child
    }
}

export const childrenService = new ChildrenService(ChildrenModel)
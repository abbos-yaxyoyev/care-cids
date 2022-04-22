import {ModelType} from "@typegoose/typegoose/lib/types"
import {COLLECTIONS} from "../../../constants/collections"
import {CommonException} from "../../../constants/exceptions"
import {ChildAppUseHistory, ChildAppUseHistoryModel} from "../../../db/models/childApps/use-history.model"
import {getDaysRange} from "../../../utils/date.utils"
import {CommonServices} from "../../common.service"

class ChildAppUseHistoryService extends CommonServices<ChildAppUseHistory> {
    constructor(model: ModelType<ChildAppUseHistory>) {super(model)}
    public async findByDayAndUpdate(data) {
        try {
            const {start, end} = getDaysRange(data.date)
            return await this.model.findOneAndUpdate(
                {
                    childId: data.childId,
                    appId: data.appId,
                    date: {
                        $gte: start,
                        $lte: end
                    }
                },
                {$set: data},
                {upsert: true, new: true}
            )
        }
        catch (error) {throw CommonException.UnknownError(error)}
    }
    public async childAppsPagin(childId, offset) {
        try {
            const $match = {
                $match: {childId}
            }
            const $sort = {
                $sort: {_id: -1}
            }
            const $skip = {
                $skip: 20 * (offset - 1)
            }
            const $limit = {
                $limit: 20
            }
            const $lookupChildApp = {
                $lookup: {
                    from: COLLECTIONS.CHILD_APPS,
                    localField: 'appId',
                    foreignField: '_id',
                    as: 'childApp'
                }
            }
            const $unwindChildApp = {
                $unwind: {
                    path: '$childApp'
                }
            }
            const $project = {
                $project: {
                    appId: 1,
                    usage: 1,
                    date: 1,
                    name: '$childApp.name',
                    usageLimit: '$childApp.usageLimit',
                }
            }
            const pipeline = [
                $match,
                $sort,
                $skip,
                $limit,
                $lookupChildApp,
                $unwindChildApp,
                $project
            ]
            return await this.aggregate(pipeline)
        }
        catch (error) {throw CommonException.UnknownError(error)}
    }
}

export const childAppUseHistoryService = new ChildAppUseHistoryService(ChildAppUseHistoryModel)
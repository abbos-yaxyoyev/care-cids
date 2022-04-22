import { ModelType } from "@typegoose/typegoose/lib/types";
import { ChatHistoryException } from "../../db/models/chatHistory/exception";
import { ChatHistoryModel, ChatHistory } from "../../db/models/chatHistory/model";
import { CommonServices } from "../common.service"

class ChatHistoryService extends CommonServices<ChatHistory> {
    constructor(model: ModelType<ChatHistory>) { super(model) }
    public async pagenationMessage(pagenation, query) {
        const $match = { $match: query };
        const $skip = { $skip: pagenation };
        const $limit = { $limit: 100 };
        const $sort = { $sort: { createdAt: -1 } }

        const pipeline = [
            $match,
            $sort,
            $skip,
            $limit
        ]
        return await this.aggregate(pipeline)
    }
}

export const chatHistoryService = new ChatHistoryService(ChatHistoryModel)
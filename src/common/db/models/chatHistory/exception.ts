import { ERROR_CODES } from "../../../constants/errors"
import { CommonException } from "../../../constants/exceptions"

export class ChatHistoryException extends CommonException {
    static NotFound(data) {
        return new CommonException(ERROR_CODES.ChatHistoryNotFound, 'message not found', data)
    }
}
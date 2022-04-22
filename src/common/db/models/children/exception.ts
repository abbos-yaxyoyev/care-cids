import {ERROR_CODES} from "../../../constants/errors"
import {CommonException} from "../../../constants/exceptions"

export class ChildrenException extends CommonException {
    static NotFound(data) {
        return new CommonException(ERROR_CODES.ChildNotFound, 'child not found', data)
    }
}
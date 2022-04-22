import {ERROR_CODES} from "../../../constants/errors"
import {CommonException} from "../../../constants/exceptions"

export class UserException extends CommonException {
    static AllreadyExist(data) {
        return new CommonException(ERROR_CODES.UserExist, 'user exist', data)
    }
    static NotFound(data) {
        return new CommonException(ERROR_CODES.UserNotFound, 'user not found', data)
    }
    static IncorrectOtp(data) {
        return new CommonException(ERROR_CODES.UserIncorrectOtp, 'incorrect otp', data)
    }
}
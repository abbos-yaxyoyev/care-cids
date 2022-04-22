import {ERROR_CODES} from "./errors"

export class CommonException {
    constructor(public code: number, public message: string, public data: any) { }
    public static UnknownError(data?: any) {
        return new CommonException(ERROR_CODES.UnknownError, 'Unknown error', data)
    }
    public static ValidationError(data?: any) {
        return new CommonException(ERROR_CODES.ValidationError, 'Validation Error', data)
    }
}
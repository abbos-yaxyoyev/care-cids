
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraintInterface,
    ValidationArguments,
    ValidatorConstraint,
} from 'class-validator'
import {UserException} from '../../db/models/user/exception'
import {userService} from '../../service/user/user.service'

@ValidatorConstraint({name: 'isPhoneAllreadyExist', async: true})
export class IsPhoneAllreadyExistConstraint implements ValidatorConstraintInterface {
    async validate(data: any) {
        const user = await userService.findByPhone(data)
        if (user) {
            throw UserException.AllreadyExist(data)
        }
        return true
    }
}

export function IsPhoneAllreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: {
                ...validationOptions,
                message: 'Allready exist'
            },
            constraints: [],
            validator: IsPhoneAllreadyExistConstraint,
        })
    }
}
import {Transform} from "class-transformer"
import {IsEnum, IsOptional, IsPhoneNumber, IsString} from "class-validator"
import {Languae} from "../../constants/language"
import {CommonDto, CommonDtoGroup} from "../common.dto"
import {IsPhoneAllreadyExist} from "../custom/IsPhoneAllreadyExist"

export class UserDtoGroup extends CommonDtoGroup {
    static LOGIN = 'login'
    static VERIFY = 'VERIFY'
}

export class UserDto extends CommonDto {
    @IsString({groups: [UserDtoGroup.CREATE]})
    name: string

    @IsOptional({groups: [UserDtoGroup.RESPONSE]})
    @Transform(({value}) => `+${value?.replace(/[^0-9]/g, '')}`)
    @IsPhoneNumber(null, {groups: [UserDtoGroup.CREATE, UserDtoGroup.LOGIN, UserDtoGroup.VERIFY]})
    @IsPhoneAllreadyExist({groups: [UserDtoGroup.CREATE]})
    phoneNumber: string

    @IsString({groups: [UserDtoGroup.VERIFY]})
    otp: string

    @IsOptional({groups: [UserDtoGroup.CREATE, UserDtoGroup.RESPONSE]})
    @IsEnum(Languae, {groups: [UserDtoGroup.CREATE]})
    language: Languae

    @IsOptional({groups: [UserDtoGroup.CREATE, UserDtoGroup.RESPONSE]})
    children: number
}
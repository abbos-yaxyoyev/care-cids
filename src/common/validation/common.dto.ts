import {IsMongoId, IsOptional} from "class-validator"
import {Types} from "mongoose"

export class CommonDtoGroup {
    static CREATE = 'create'
    static UPDATE = 'update'
    static DELETE = 'delete'
    static GET_BY_ID = 'getById'
    static RESPONSE = 'response'
}

export class CommonDto {
    @IsOptional({groups: [CommonDtoGroup.RESPONSE]})
    @IsMongoId({groups: [CommonDtoGroup.UPDATE, CommonDtoGroup.DELETE, CommonDtoGroup.GET_BY_ID]})
    _id: string

    @IsOptional({groups: [CommonDtoGroup.RESPONSE]})
    createdAt: string

    @IsOptional({groups: [CommonDtoGroup.RESPONSE]})
    updatedAt: string
}
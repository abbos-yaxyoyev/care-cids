import {IsLatitude, IsLongitude, IsOptional, IsString, Matches} from "class-validator"
import {CommonDto, CommonDtoGroup} from "../common.dto"

export class ChildrenDto extends CommonDto {

    @IsOptional({groups: [CommonDtoGroup.RESPONSE]})
    @IsString({groups: [CommonDtoGroup.CREATE]})
    name: string

    @IsOptional({groups: [CommonDtoGroup.RESPONSE]})
    @Matches(/\d{2}\.\d{2}\.\d{4}/, {groups: [CommonDtoGroup.CREATE]})
    birthdate: string

    @IsOptional({groups: [CommonDtoGroup.RESPONSE]})
    uuid: string

    parentId: string

    @IsOptional({groups: [CommonDtoGroup.RESPONSE]})
    latitude: number

    @IsOptional({groups: [CommonDtoGroup.RESPONSE]})
    longitude: number
}

export class LocationDto extends CommonDto {
    @IsLatitude({groups: [CommonDtoGroup.CREATE]})
    latitude: number

    @IsLongitude({groups: [CommonDtoGroup.CREATE]})
    longitude: number
}

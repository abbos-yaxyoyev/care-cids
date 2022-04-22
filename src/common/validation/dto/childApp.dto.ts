import {Type} from "class-transformer"
import {ArrayMinSize, IsArray, IsDateString, IsNumber, IsObject, IsString, MinLength, ValidateNested} from "class-validator"
import {CommonDto, CommonDtoGroup} from "../common.dto"

export class OneAppDto {

    @IsString({groups: [CommonDtoGroup.CREATE]})
    name: string

    @IsNumber({}, {groups: [CommonDtoGroup.CREATE]})
    usage: number

    @IsDateString({strict: true}, {groups: [CommonDtoGroup.CREATE]})
    date: string

    usageLimit: number

    childId: string
}

export class ChildAppDto extends CommonDto {
    @Type(() => OneAppDto)
    @ValidateNested({each: true, groups: [CommonDtoGroup.CREATE]})
    @IsObject({each: true, groups: [CommonDtoGroup.CREATE]})
    @IsArray({groups: [CommonDtoGroup.CREATE]})
    @ArrayMinSize(1, {groups: [CommonDtoGroup.CREATE]})
    apps: OneAppDto[]
}
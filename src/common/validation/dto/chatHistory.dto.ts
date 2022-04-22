import { CommonDtoGroup, CommonDto } from "../common.dto";
import { IsString, IsMongoId, IsOptional, IsNumber } from "class-validator";


export class ChatDtoGroup extends CommonDtoGroup {
    static MESSAGE = 'message';
    static NUMBER = 'number'
}

export class ChatDto extends CommonDto {
    @IsString({ groups: [ChatDtoGroup.MESSAGE, ChatDtoGroup.UPDATE, ChatDtoGroup.CREATE] })
    message: string;

    @IsOptional({
        groups: [
            ChatDtoGroup.UPDATE, ChatDtoGroup.GET_BY_ID,
            ChatDtoGroup.NUMBER, ChatDtoGroup.CREATE
        ]
    })
    @IsMongoId({
        groups: [
            ChatDtoGroup.UPDATE, ChatDtoGroup.GET_BY_ID,
            ChatDtoGroup.NUMBER, ChatDtoGroup.CREATE
        ]
    })
    childId: string

    //! for pagenation 
    @IsNumber(
        {
            allowInfinity: false,
            allowNaN: false
        },
        { groups: [ChatDtoGroup.NUMBER] }
    )
    pagenation: number;
}
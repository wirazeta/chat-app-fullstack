import { IsOptional, IsString } from "class-validator";
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateChatDto {
    @IsString()
    @IsOptional()
    chatName?: string;
}

export class AccessChatDto {
    @IsString()
    @ApiProperty()
    userId: string

    constructor(init?:Partial<AccessChatDto>){
        Object.assign(this,init);
    }
}

export class RenameGroupChatDto {
    @IsString()
    @IsOptional()
    chatId?:string

    @IsString()
    @IsOptional()
    chatName?:string
}

export class RemoveGroupChatDto {
    @IsString()
    @IsOptional()
    chatId?:string
}

export class AddUserToGroupChatDto {
    @IsString()
    @IsOptional()
    chatId?:string

    @IsString()
    @IsOptional()
    userId?:string
}
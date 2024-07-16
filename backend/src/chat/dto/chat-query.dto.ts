import { IsObject, IsOptional, IsString } from "class-validator";
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { User } from "src/users/schemas/users.schema";

export class CreateChatDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    chatName?: string;

    @IsObject()
    @ApiProperty()
    userIds: string[]
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
    @ApiProperty()
    chatName?:string
}

export class RemoveFromGroupDto{
    @IsString()
    @IsOptional()
    chatId?:string

    @IsString()
    @IsOptional()
    @ApiProperty()
    userId?:string
}

export class AddUserToGroupChatDto {
    @IsString()
    @IsOptional()
    chatId?:string

    @IsString()
    @IsOptional()
    @ApiProperty()
    userId?:string
}
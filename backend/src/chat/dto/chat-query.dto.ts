import { IsOptional, IsString } from "class-validator";

export class CreateChatDto {
    @IsString()
    @IsOptional()
    chatName?: string;
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
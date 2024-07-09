import { IsBoolean, IsString } from "class-validator";

export class CreateGroupChatDto {
    @IsString()
    chatName
}

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    chatId?:string
    
    @IsString()
    @ApiProperty()
    content: string
}

import { PartialType } from '@nestjs/swagger';
import { CreateChatDto } from './chat-query.dto';

export class UpdateChatDto extends PartialType(CreateChatDto) {}

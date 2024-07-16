import { PartialType } from '@nestjs/swagger';
import { CreateMessageDto } from './message-query.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}

import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatUseCase } from 'src/modules/chat/useCase/chatUseCase';
import { OpenAiService } from 'src/service/openAi/openAi.service';

@Module({
  controllers: [ChatController],
  providers: [ChatUseCase, OpenAiService],
})
export class ChatModule {}

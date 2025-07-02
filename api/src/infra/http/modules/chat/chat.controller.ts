import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatUseCase } from 'src/modules/chat/useCase/chatUseCase';
import { ChatBody } from './dtos/chatBody';

@Controller('chat')
export class ChatController {
  constructor(private readonly ChatUseCase: ChatUseCase) {}

  @Post('message')
  sendMessage(@Body() body: ChatBody) {
    return this.ChatUseCase.sendMessage(body.input);
  }
}

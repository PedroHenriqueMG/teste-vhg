import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/service/openAi/openAi.service';

@Injectable()
export class ChatUseCase {
  constructor(private openAiService: OpenAiService) {}

  async sendMessage(message: string) {
    const response = await this.openAiService.ask(message);
    return response;
  }
}

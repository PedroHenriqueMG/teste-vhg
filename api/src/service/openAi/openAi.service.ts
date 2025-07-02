import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { env } from 'process';

@Injectable()
export class OpenAiService {
  private openAi = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });

  async ask(prompt: string): Promise<string> {
    const response = await this.openAi.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content || '';
  }
}

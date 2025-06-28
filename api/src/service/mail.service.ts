import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail(email: string) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Energia Note-taking',
      text: 'Anotção criada com sucesso!',
    });
  }
}

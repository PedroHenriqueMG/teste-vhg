import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard';
import { NoteModule } from './infra/http/modules/note/note.module';
import { UserModule } from './infra/http/modules/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    NoteModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_EMAIL,
          pass: process.env.MAIL_SECRET,
        },
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

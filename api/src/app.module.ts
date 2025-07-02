import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './infra/database/database.module';
import { ActivityModule } from './infra/http/modules/activity/activity.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard';
import { ChatModule } from './infra/http/modules/chat/chat.module';
@Module({
  imports: [DatabaseModule, AuthModule, ActivityModule, ChatModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

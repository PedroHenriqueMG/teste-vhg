import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ActivityController } from './activity.controller';
import { ActivityUseCase } from 'src/modules/activity/useCase/ActivityUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [ActivityController],
  providers: [ActivityUseCase],
})
export class ActivityModule {}

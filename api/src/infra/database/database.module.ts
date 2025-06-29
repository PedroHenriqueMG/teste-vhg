import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/auth/repositories/UserRepository';
import { PrismaUserRepository } from './prisma/repositories/user/PrismaUserRepository';
import { ActivityRepository } from 'src/modules/activity/repository/ActivityRepository';
import { PrismaActivityRepository } from './prisma/repositories/activity/PrismaActivityRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ActivityRepository,
      useClass: PrismaActivityRepository,
    },
  ],
  exports: [UserRepository, ActivityRepository],
})
export class DatabaseModule {}

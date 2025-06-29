import { Injectable } from '@nestjs/common';
import { Activity } from 'src/modules/activity/entities/Activity';
import { PrismaActivityMapper } from '../../mappers/activity/PrismaActivityMapper';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaActivityRepository {
  constructor(private prisma: PrismaService) {}
  async upsert(notes: Activity) {
    const activityRaw = PrismaActivityMapper.toCreate(notes);

    const createNote = await this.prisma.activity.upsert({
      where: {
        id: activityRaw.id,
      },
      update: {
        name: activityRaw.name,
        intensity: activityRaw.intensity,
        duration: activityRaw.duration,
      },
      create: {
        id: activityRaw.id,
        user_id: activityRaw.user_id,
        name: activityRaw.name,
        intensity: activityRaw.intensity,
        duration: activityRaw.duration,
        createdAt: activityRaw.createdAt,
        updatedAt: activityRaw.updatedAt,
      },
    });

    return createNote;
  }

  async findAll(user_id: string) {
    const allNotes = await this.prisma.activity.findMany({
      where: {
        user_id: user_id,
      },
    });

    return allNotes;
  }

  async findById(id: string) {
    const note = await this.prisma.activity.findUnique({
      where: {
        id: id,
      },
    });

    return note;
  }

  async delete(id: string) {
    const deleteNote = await this.prisma.activity.delete({
      where: {
        id: id,
      },
    });

    return deleteNote;
  }
}

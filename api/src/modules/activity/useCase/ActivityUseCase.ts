import { Injectable } from '@nestjs/common';
import { Activity } from '../entities/Activity';
import { ActivityNotFoundException } from '../exceptions/ActivityNotFound';
import { ActivityRepository } from '../repository/ActivityRepository';
import { ActivityIntensity } from '@prisma/client';

interface ActivityProps {
  user_id: string;
  name: string;
  intensity: ActivityIntensity;
  duration: string;
}

interface ActivityUpdateProps {
  id: string;
  user_id: string;
  name?: string;
  intensity?: ActivityIntensity;
  duration?: string;
}

@Injectable()
export class ActivityUseCase {
  constructor(private activityRepository: ActivityRepository) {}

  async create({ duration, intensity, name, user_id }: ActivityProps) {
    const activity = new Activity({
      duration,
      intensity,
      name,
      user_id,
    });
    const createActivity = await this.activityRepository.upsert(activity);

    return createActivity;
  }

  async findAll(user_id: string) {
    const allActivities = await this.activityRepository.findAll(user_id);

    return allActivities;
  }

  async findOne(id: string) {
    const activity = await this.activityRepository.findById(id);

    if (!activity) throw new ActivityNotFoundException();

    return activity;
  }

  async update({
    id,
    name,
    intensity,
    duration,
    user_id,
  }: ActivityUpdateProps): Promise<Activity | undefined> {
    const existActivity = await this.activityRepository.findById(id);

    if (!existActivity) throw new ActivityNotFoundException();

    const activity = new Activity(
      {
        duration: duration || existActivity.duration,
        intensity: intensity || existActivity.intensity,
        name: name || existActivity.name,
        user_id,
      },
      id,
    );

    const updateActivity = await this.activityRepository.upsert(activity);

    return updateActivity;
  }

  async delete(id: string) {
    const existActivity = await this.activityRepository.findById(id);

    if (!existActivity) throw new ActivityNotFoundException();

    return this.activityRepository.delete(id);
  }
}

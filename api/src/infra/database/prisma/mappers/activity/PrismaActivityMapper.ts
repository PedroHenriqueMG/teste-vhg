import { Activity } from 'src/modules/activity/entities/Activity';

export class PrismaActivityMapper {
  static toCreate({
    duration,
    id,
    intensity,
    name,
    user_id,
    createdAt,
    updatedAt,
  }: Activity) {
    return {
      duration,
      intensity,
      name,
      user_id,
      id,
      createdAt,
      updatedAt,
    };
  }
}

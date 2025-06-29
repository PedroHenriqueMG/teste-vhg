import { Activity } from '../entities/Activity';

export abstract class ActivityRepository {
  abstract upsert(activity: Activity): Promise<Activity | undefined>;
  abstract findById(id: string): Promise<Activity | null>;
  abstract findAll(user_id: string): Promise<Activity[]>;
  abstract delete(id: string): Promise<null>;
}

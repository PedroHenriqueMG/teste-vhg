import { ActivityIntensity } from '@prisma/client';
import { randomUUID } from 'crypto';
import { Replace } from 'src/types/replace';

interface ActivitySchema {
  user_id: string;
  name: string;
  intensity: ActivityIntensity;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
}
export class Activity {
  private props: ActivitySchema;
  private _id: string;

  constructor(
    props: Replace<ActivitySchema, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id() {
    return this._id;
  }

  get user_id() {
    return this.props.user_id;
  }

  set user_id(user_id: string) {
    this.props.user_id = user_id;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get duration() {
    return this.props.duration;
  }

  set duration(duration: string) {
    this.props.duration = duration;
  }

  get intensity() {
    return this.props.intensity;
  }

  set intensity(intensity: ActivityIntensity) {
    this.props.intensity = intensity;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}

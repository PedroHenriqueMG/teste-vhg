enum Intensity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

enum Duration {
  '30 min',
  '45 min',
  '60 min',
  '90 min',
}

export type Activity = {
  id: string;
  name: string;
  intensity: Intensity;
  duration: Duration;
};

import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  OPENAI_API_KEY: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRE: z.string(),
});

export const env = envSchema.parse(process.env);

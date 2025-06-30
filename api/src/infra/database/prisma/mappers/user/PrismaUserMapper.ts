import { User } from '../../../../../modules/auth/entities/User';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma({
    createdAt,
    email,
    password,
    id,
    updatedAt,
  }: User): UserRaw {
    return {
      updatedAt,
      createdAt,
      email,
      password,
      id,
    };
  }

  static toDomain({
    id,
    createdAt,
    email,
    password,
    updatedAt,
  }: UserRaw): User {
    return new User(
      {
        updatedAt,
        createdAt,
        email,
        password,
      },
      id,
    );
  }
}

import { User } from '../../../../../modules/user/entities/User';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma({
    createdAt,
    email,
    name,
    password,
    id,
    updatedAt,
  }: User): UserRaw {
    return {
      updatedAt,
      createdAt,
      email,
      name,
      password,
      id,
    };
  }

  static toDomain({
    id,
    createdAt,
    email,
    name,
    password,
    updatedAt,
  }: UserRaw): User {
    return new User(
      {
        updatedAt,
        createdAt,
        email,
        name,
        password,
      },
      id,
    );
  }
}

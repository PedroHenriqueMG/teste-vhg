import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from 'src/modules/auth/entities/User';
import { UserWithSameEmailException } from 'src/modules/auth/exceptions/UserWithSameEmailException';
import { UserRepository } from 'src/modules/auth/repositories/UserRepository';

interface SignUpRequest {
  email: string;
  password: string;
}

@Injectable()
export class SignUpUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: SignUpRequest) {
    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) throw new UserWithSameEmailException();

    const user = new User({
      email,
      password: await hash(password, 10),
    });

    await this.userRepository.create(user);

    return user;
  }
}

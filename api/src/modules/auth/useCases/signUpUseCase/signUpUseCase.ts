import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from 'src/modules/user/entities/User';
import { UserWithSameEmailException } from 'src/modules/user/exceptions/UserWithSameEmailException';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';

interface SignUpRequest {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class SignUpUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, name, password }: SignUpRequest) {
    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) throw new UserWithSameEmailException();

    const user = new User({
      email,
      name,
      password: await hash(password, 10),
    });

    await this.userRepository.create(user);

    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/auth/entities/User';
import { UserPayload } from '../../models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../repositories/UserRepository';
import { UserNotFoundException } from '../../exceptions/UserNotFound';

interface SignInRequest {
  user: User;
}

@Injectable()
export class SignInUseCase {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async execute({ user }: SignInRequest) {
    const userData = await this.userRepository.findByEmail(user.email);

    if (!userData) throw new UserNotFoundException();

    const payload: UserPayload = {
      sub: userData.id,
      email: userData.email,
      createdAt: userData.createdAt.toJSON(),
    };

    const jwtToken = this.jwtService.sign(payload);

    const { password: _, ...userWithoutPassword } = userData;

    return {
      token: jwtToken,
      user: userWithoutPassword,
    };
  }
}

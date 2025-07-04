import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthRequestModel } from './models/authRequestModel';
import { SignInUseCase } from '../../../../modules/auth/useCases/signInUsecase/signInUseCase';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { Public } from './decorators/isPublic';
import { ApiTags } from '@nestjs/swagger';
import { SignUpUseCase } from 'src/modules/auth/useCases/signUpUseCase/signUpUseCase';
import { SignUpBody } from './dtos/SignUpBody';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase,
  ) {}

  @Post('signIn')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() request: AuthRequestModel) {
    const { token, user } = await this.signInUseCase.execute({
      user: request.user,
    });

    return { access_token: token, user };
  }

  @Post('signUp')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() body: SignUpBody) {
    const { email, password } = body;
    await this.signUpUseCase.execute({
      email,
      password,
    });
  }
}

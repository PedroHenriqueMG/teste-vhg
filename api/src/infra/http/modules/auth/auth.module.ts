import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { ValidateUserUseCase } from 'src/modules/auth/useCases/validateUserUseCase/validateUserUseCase';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../../../database/database.module';
import { SignInDTOValidateMiddleware } from './middleware/signInDTOValidate.middleware';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUsecase/signInUseCase';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { env } from 'src/env';
import { SignUpUseCase } from 'src/modules/auth/useCases/signUpUseCase/signUpUseCase';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    ValidateUserUseCase,
    SignInUseCase,
    SignUpUseCase,
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidateMiddleware).forRoutes('/signIn');
  }
}

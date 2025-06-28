import { makeUser } from 'src/modules/user/factories/userFactory';
import { SignUpUseCase } from './signUpUseCase';
import { UserRepositoryInMemory } from 'src/modules/user/repositories/UserRepositoryInMemory';
import { UserWithSameEmailException } from 'src/modules/user/exceptions/UserWithSameEmailException';

let signUpUseCase: SignUpUseCase;
let userRepository: UserRepositoryInMemory;

describe('Sign up', () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    signUpUseCase = new SignUpUseCase(userRepository);
  });

  it('should be able to create a new user', async () => {
    expect(userRepository.users).toEqual([]);

    await signUpUseCase.execute({
      email: 'vitorlostada@hotmail.com',
      name: 'Vitor Lostada',
      password: '123123',
    });

    expect(userRepository.users).toHaveLength(1);
  });

  it('should throw an error when creating a user with an existing email', async () => {
    const user = makeUser();

    userRepository.users.push(user);

    await expect(
      async () =>
        await signUpUseCase.execute({
          email: user.email,
          name: user.name,
          password: '123123123123',
        }),
    ).rejects.toThrow(UserWithSameEmailException);
  });
});

import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const userExists = await userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('E-mail já cadastrado');
    }

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;

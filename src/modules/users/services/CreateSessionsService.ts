import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findByEmail(email);

    // conferindo se existe usupario com email passado na rota
    if (!user) {
      throw new AppError('E-mail negado para autentificação', 401);
    }

    // comparando senha que veio da rota com a senha do usuário
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Senha incorreta', 401);
    }

    // criando token, que servirá para autenticação
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;

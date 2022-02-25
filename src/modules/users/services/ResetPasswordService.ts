// SERVIÇO PARA ATUALIZAR A SENHA DO USUÁRIO
// CASO O USUÁRIO NÃO LEMBRE MAIS DE SUA SENHA DE CADASTRO

import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    // buscar token cadastrado no banco, caso algum usuário
    // já tenha pedido alguma atualização de senha
    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token não existe');
    }

    // buscar usário atraves do id na tabela do token, pelo user.id
    // relacionado com o usuário
    const user = await userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuário não existe');
    }

    // buscando data de criação do token
    const tokenCreatedAt = userToken.created_at;
    // adicionando mais duas horas no tempo de criação do token
    const compareDate = addHours(tokenCreatedAt, 2);

    // se for maior que duas horas o token é expirado
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token Expirado');
    }

    // atualiando nova senha
    user.password = await hash(password, 8);

    // salvando nova senha de usuario
    await userRepository.save(user);
  }
}

export default ResetPasswordService;

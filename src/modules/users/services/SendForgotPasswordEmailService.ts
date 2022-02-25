// SERVIÇO PARA GERAR UM NOVO TOKEN PARA ATUALIZAÇÃO DE SENHA
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    // buscar usuário no banco atraves do email passado
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não existe');
    }

    // criando um novo token e inserindo no banco
    const { token } = await userTokenRepository.generate(user.id);

    //console.log(token);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[RECUPERAÇÃO DE SENHAS]',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3333/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;

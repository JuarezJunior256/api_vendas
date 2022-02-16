import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuario não encontrado', 400);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // verificando se existe o arquivo no diretorio de imagens
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // se existir ele apagar o arquivo
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await userRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;

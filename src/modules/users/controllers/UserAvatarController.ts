import { Request, Response } from 'express';
import UpdateAvatarService from '../services/UpdateAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateAvatarService();

    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  }
}

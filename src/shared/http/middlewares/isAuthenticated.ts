import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // recebendo token de autenticação
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Não autorizado', 400);
  }

  // recebendo somente o token
  const [, token] = authHeader.split(' ');

  try {
    // verificando se o token é o autenticado
    const decodeToken = verify(token, authConfig.jwt.secret);

    console.log(decodeToken);

    const { sub } = decodeToken as TokenPayLoad;

    request.user = {
      id: sub,
    };
    return next();
  } catch (error) {
    throw new AppError('Invalido JWT token', 400);
  }
}

import { Request, Response, NextFunction } from 'express';
import jwtDecode from 'jwt-decode';
import * as ContextService from 'request-context';
import { getConnection } from 'typeorm';
import { User } from '@/users/entities/user.entity';

export async function setRequestContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.slice(7);

  if (token) {
    const payload: any = jwtDecode(token);
    const user = await getConnection().getRepository(User).findOne(payload.sub);

    ContextService.set('request:user', user);
  } else {
    ContextService.set('request:user', null);
  }

  next();
}

import * as ContextService from 'request-context';
import { User } from '@/users/entities/user.entity';

export function auth(): User | Record<string, any> {
  const user: User = ContextService.get('request:user');

  return user ? user : {};
}

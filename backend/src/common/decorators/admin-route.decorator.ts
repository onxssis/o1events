import { AuthGuard } from '@/auth/guards/jwt.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';

export const ADMIN_ROUTE = 'ADMIN_ROUTE';
export const AdminRoute = () => {
  return applyDecorators(UseGuards(AuthGuard, AdminGuard));
};

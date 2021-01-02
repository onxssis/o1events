import { SetMetadata } from '@nestjs/common';

export const ADMIN_ROUTE = 'ADMIN_ROUTE';
export const AdminRoute = () => SetMetadata(ADMIN_ROUTE, true);

import { Test, TestingModule } from '@nestjs/testing';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let adminGuard: AdminGuard;
  const executionContext: any = {
    switchToHttp: () => ({
      getRequest: () => ({ user: { is_admin: false } }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminGuard],
    }).compile();

    adminGuard = module.get<AdminGuard>(AdminGuard);
  });

  it('should be defined', () => {
    expect(adminGuard).toBeDefined();
  });

  it('should call the canActivate method', async () => {
    const canActivate = adminGuard.canActivate(executionContext);

    expect(canActivate).toBe(false);
  });
});

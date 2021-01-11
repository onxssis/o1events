import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { factory, FactoryModule } from '@/factory';

import { AppModule } from './../src/app.module';
import * as utils from './utils';
import { User } from '@/users/entities/user.entity';
import { getRepository } from 'typeorm';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, FactoryModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  beforeEach(async () => {
    await utils.emptyDBTables();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Register/Login Tests', () => {
    it('should validate registration fields correctly', async () => {
      const user = await factory(User).make({
        name: '',
        email: 'incorrectemail',
      });

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message).toHaveLength(2);
    });

    it('should create new user after successful registration', async () => {
      const user = await factory(User).make();

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(HttpStatus.CREATED);

      expect(response.body.name).toEqual(user.name);
      expect((await getRepository(User).findOne(user.id)).name).toEqual(
        user.name,
      );
    });

    it('should validate login fields correctly', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({ email: 'wrongemail', password: '4943)@dk' })
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message).toHaveLength(1);
    });

    it('should not authenticate user if credentials are incorrect', async () => {
      await factory(User).create({ password: '4943)@dk' });

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({ email: 'doesntexist@gmail.com', password: '4943)@dk' })
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message).toEqual('Invalid credentials provided');
    });

    it('should authenticate user if credentials are correct', async () => {
      const user = await factory(User).create({ password: '4943)@dk' });

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({ email: user.email, password: '4943)@dk' })
        .expect(HttpStatus.CREATED);

      expect(response.body.access_token).toBeTruthy();
    });

    it('should not return user profile if not authenticated', async () => {
      await factory(User).create();

      await request(app.getHttpServer())
        .get('/auth/profile')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should return user profile if authenticated', async () => {
      const user = await factory(User).create({ password: '4943)@dk' });

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({ email: user.email, password: '4943)@dk' })
        .expect(HttpStatus.CREATED);

      token = response.body.access_token;

      const profileResponse = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK);

      expect(profileResponse.body.name).toEqual(user.name);
    });
  });
});

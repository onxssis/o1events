import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { factory, FactoryModule } from '@/factory';

import { AppModule } from './../src/app.module';
import * as utils from './utils';
import { User } from '@/users/entities/user.entity';
import { Category } from '@/categories/entities/category.entity';

describe('CategoriesController (e2e)', () => {
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

  describe('Categories Tests', () => {
    it('should return a list of categories', async () => {
      await factory(Category).createMany(2);

      const response = await request(app.getHttpServer())
        .get('/categories')
        .expect(200);
      expect(response.body).toHaveLength(2);
    });

    it('should not allow unauthenticated user create category', async () => {
      const category = await factory(Category).make();

      const response = await request(app.getHttpServer())
        .post('/categories')
        .set('Accept', 'application/json')
        .send(category)
        .expect(HttpStatus.UNAUTHORIZED);

      expect(response.body.message).toEqual('Unauthorized');
    });

    it('should not allow non admin user create category', async () => {
      const response = await publishCategory({}, { is_admin: false });

      expect(response.status).toEqual(HttpStatus.FORBIDDEN);
      expect(response.body.message).toEqual('Forbidden resource');
    });

    it('should allow admin user create category', async () => {
      const category = await factory(Category).make();
      const response = await publishCategory(category);

      expect(response.status).toEqual(HttpStatus.CREATED);

      expect(response.body.name).toEqual(category.name);
    });

    it('should validate fields correctly when creating an category', async () => {
      const response = await publishCategory({ name: '', description: '' });

      expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toHaveLength(1);
    });

    it('should not allow unauthenticated user delete an category', async () => {
      const category = await factory(Category).create();

      const response = await request(app.getHttpServer())
        .delete(`/categories/${category.id}`)
        .set('Accept', 'application/json')
        .expect(HttpStatus.UNAUTHORIZED);

      expect(response.body.message).toEqual('Unauthorized');
    });

    it('should not allow non admin user delete an category', async () => {
      const category = await factory(Category).create();

      await authenticateUser();

      const response = await request(app.getHttpServer())
        .delete(`/categories/${category.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.FORBIDDEN);

      expect(response.body.message).toEqual('Forbidden resource');
    });

    it('should allow admin user delete category', async () => {
      const category = await factory(Category).create();

      await authenticateUser({ is_admin: true });

      const response = await request(app.getHttpServer())
        .delete(`/categories/${category.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK);

      expect(response.body.affected).toEqual(1);
    });

    it('should not allow unauthenticated user update an category', async () => {
      const category = await factory(Category).create();

      const response = await request(app.getHttpServer())
        .put(`/categories/${category.id}`)
        .set('Accept', 'application/json')
        .send({ name: 'updated name' })
        .expect(HttpStatus.UNAUTHORIZED);

      expect(response.body.message).toEqual('Unauthorized');
    });

    it('should not allow non admin user update an category', async () => {
      const category = await factory(Category).create();

      await authenticateUser();

      const response = await request(app.getHttpServer())
        .put(`/categories/${category.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'updated name' })
        .expect(HttpStatus.FORBIDDEN);

      expect(response.body.message).toEqual('Forbidden resource');
    });

    it('should allow admin user update category', async () => {
      const category = await factory(Category).create();

      await authenticateUser({ is_admin: true });

      const response = await request(app.getHttpServer())
        .put(`/categories/${category.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'updated name' })
        .expect(HttpStatus.OK);

      expect(response.body.name).toEqual('updated name');
    });
  });

  async function publishCategory(
    overrides: Partial<Category> = {},
    userOverrides: Partial<User> = {},
  ) {
    const user = await factory(User).create({
      password: 'pass@erd',
      is_admin: true,
      ...userOverrides,
    });

    const category = await factory(Category).make(overrides);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: user.email, password: 'pass@erd' });

    token = response.body.access_token;

    return request(app.getHttpServer())
      .post('/categories')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(category);
  }

  async function authenticateUser(overrides: Partial<User> = {}) {
    const user = await factory(User).create({
      password: 'pass@erd',
      ...overrides,
    });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: user.email, password: 'pass@erd' });

    token = response.body.access_token;

    return response;
  }
});

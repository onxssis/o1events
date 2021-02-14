import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { factory, FactoryModule } from '@/factory';

import { AppModule } from './../src/app.module';
import * as utils from './utils';
import { User } from '@/users/entities/user.entity';
import { getRepository } from 'typeorm';
import { Event } from '@/events/entities/event.entity';

describe('ReservationsController (e2e)', () => {
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

  describe('Make and Remove Reservation Tests', () => {
    it('should not create a reservation if user is unauthenticated', async () => {
      await request(app.getHttpServer())
        .post('/reservations')
        .set('Content-Type', 'application/json')
        .send({})
        .expect(HttpStatus.UNAUTHORIZED);

      await request(app.getHttpServer())
        .post('/reservations')
        .set('Content-Type', 'application/json')
        .send({ event: 'not an integer' })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('validate reservations request body correctly', async () => {
      await factory(Event).create();
      await authenticateUser();

      await request(app.getHttpServer())
        .post('/reservations')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ event: 'kldsls' })
        .expect(HttpStatus.BAD_REQUEST);

      await request(app.getHttpServer())
        .post('/reservations')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ event: '' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('make reservation for authenticated user for a given event', async () => {
      const event = await factory(Event).create();
      await authenticateUser();

      const response = await request(app.getHttpServer())
        .post('/reservations')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ event: 1 })
        .expect(HttpStatus.CREATED);

      expect(response.body.ok).toBe(true);
      expect(
        (await getRepository(Event).findOne(event.id)).reservations,
      ).toHaveLength(1);
    });

    it('remove reservation for authenticated user for a given event', async () => {
      const event = await factory(Event).create();
      await authenticateUser();

      await request(app.getHttpServer())
        .post('/reservations')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ event: 1 })
        .expect(HttpStatus.CREATED);

      const response = await request(app.getHttpServer())
        .delete('/reservations')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ event: 1 })
        .expect(HttpStatus.OK);

      expect(response.body.ok).toBe(true);
      expect(
        (await getRepository(Event).findOne(event.id)).reservations,
      ).toHaveLength(0);
    });
  });

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

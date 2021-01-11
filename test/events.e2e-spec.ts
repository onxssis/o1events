import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { factory, FactoryModule } from '@/factory';

import { AppModule } from './../src/app.module';
import * as utils from './utils';
import { Event } from '@/events/entities/event.entity';
import { User } from '@/users/entities/user.entity';

describe('EventsController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, FactoryModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await utils.emptyDBTables();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Events Tests', () => {
    describe('View/List Events Tests', () => {
      it('should return a list of events', async () => {
        await factory(Event).createMany(2);

        const response = await request(app.getHttpServer())
          .get('/events')
          .expect(200);
        expect(response.body.data).toHaveLength(2);
      });

      it('should return a list of paginated events', async () => {
        await factory(Event).createMany(2);

        const response = await request(app.getHttpServer())
          .get('/events?limit=1&page=1')
          .expect(200);

        expect(response.body.data).toHaveLength(1);
        expect(response.body.hasMorePages).toBe(true);
      });
    });

    describe('Create Events Tests', () => {
      it('should not allow unauthenticated user create event', async () => {
        const event = await factory(Event).make();

        const response = await request(app.getHttpServer())
          .post('/events')
          .set('Accept', 'application/json')
          .send(event)
          .expect(HttpStatus.UNAUTHORIZED);

        expect(response.body.message).toEqual('Unauthorized');
      });

      it('should not allow non admin user create event', async () => {
        const user = await factory(User).create({ password: 'pass@erd' });
        const event = await factory(Event).make();

        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .set('Accept', 'application/json')
          .send({ email: user.email, password: 'pass@erd' })
          .expect(HttpStatus.CREATED);

        expect(response.body.access_token).toBeTruthy();

        token = response.body.access_token;

        const eventResponse = await request(app.getHttpServer())
          .post('/events')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(event)
          .expect(HttpStatus.FORBIDDEN);

        expect(eventResponse.body.message).toEqual('Forbidden resource');
      });

      it('should allow admin user create event', async () => {
        const user = await factory(User).create({
          password: 'pass@erd',
          is_admin: true,
        });
        const event = await factory(Event).make();

        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .set('Accept', 'application/json')
          .send({ email: user.email, password: 'pass@erd' })
          .expect(HttpStatus.CREATED);

        expect(response.body.access_token).toBeTruthy();

        token = response.body.access_token;

        const eventResponse = await request(app.getHttpServer())
          .post('/events')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(event)
          .expect(HttpStatus.CREATED);

        expect(eventResponse.body.title).toEqual(event.title);
      });
    });
  });
});

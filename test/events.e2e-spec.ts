import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { factory, FactoryModule } from 'typeorm-factories';

import { AppModule } from './../src/app.module';
import * as utils from './utils';
import { User } from '@/users/entities/user.entity';
import { populateEvents } from './helpers';
import { Event } from '@/events/entities/event.entity';

describe('EventsController (e2e)', () => {
  let app: INestApplication;

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
    it('should return a list of events', async () => {
      await populateEvents();

      const response = await request(app.getHttpServer())
        .get('/events')
        .expect(200);
      expect(response.body.data).toHaveLength(2);
    });

    it('should return a list of paginated events', async () => {
      await populateEvents();

      const response = await request(app.getHttpServer())
        .get('/events?limit=1&page=1')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.hasMorePages).toBe(true);
    });

    it('should not allow unauthenticated user create event', async () => {
      const event = await factory(Event).make();

      const response = await request(app.getHttpServer())
        .post('/events')
        .set('Accept', 'application/json')
        .send(event)
        .expect(HttpStatus.UNAUTHORIZED);

      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});

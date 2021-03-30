import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { factory, FactoryModule } from '@/factory';

import { AppModule } from './../src/app.module';
import * as utils from './utils';
import { Event, EventType } from '@/events/entities/event.entity';
import { User } from '@/users/entities/user.entity';
import { Category } from '@/categories/entities/category.entity';

describe('EventsController (e2e)', () => {
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

  describe('Events Tests', () => {
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

    it('should return a list of events filtered by search query q', async () => {
      await factory(Event).createMany(2);
      await factory(Event).create({ title: 'Node Dev Summit' });

      const response = await request(app.getHttpServer())
        .get('/events?q=node')
        .expect(200);

      const event = response.body.data[0];
      expect(response.body.data).toHaveLength(1);
      expect(event.title).toBe('Node Dev Summit');
      expect(response.body.hasMorePages).toBe(false);
    });

    it('should return a list of events filtered by type', async () => {
      await factory(Event).createMany(2);
      await factory(Event).create({ type: EventType.ONLINE });

      const response = await request(app.getHttpServer())
        .get('/events?type=online')
        .expect(200);

      const event = response.body.data[0];
      expect(response.body.data).toHaveLength(1);
      expect(event.type).toBe(EventType.ONLINE);
      expect(response.body.hasMorePages).toBe(false);
    });

    // it('should return a list of events filtered by startDate & endDate', async () => {
    //   const startDate = new Date();
    //   const endDate = new Date(startDate.getTime() + 60 * 60000);
    //   await factory(Event).createMany(2);
    //   await factory(Event).create({ startDate, endDate, title: 'Test Event' });

    //   const response = await request(app.getHttpServer())
    //     .get(
    //       `/events?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
    //     )
    //     .expect(200);

    //   const event = response.body.data[0];
    //   expect(response.body.data).toHaveLength(1);
    //   expect(event.title).toBe('Test Event');
    //   expect(response.body.hasMorePages).toBe(false);
    // });

    it('should return a list of events filtered by category', async () => {
      await factory(Category).createMany(2);
      const category = await factory(Category).create({ name: 'tech' });
      await factory(Event).createMany(2);
      await factory(Event).create({
        categories: [category],
        title: 'tech event',
      });

      const response = await request(app.getHttpServer())
        .get(`/events?category=tech`)
        .expect(200);

      const event = response.body.data[0];
      expect(response.body.data).toHaveLength(1);
      expect(event.title).toBe('tech event');
      expect(response.body.hasMorePages).toBe(false);
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

    it('should not allow non admin user create event', async () => {
      const response = await publishEvent({}, { isAdmin: false });

      expect(response.status).toEqual(HttpStatus.FORBIDDEN);
      expect(response.body.message).toEqual('Forbidden resource');
    });

    it('should allow admin user create event', async () => {
      const event = await factory(Event).make();
      const response = await publishEvent(event);

      expect(response.status).toEqual(HttpStatus.CREATED);

      expect(response.body.title).toEqual(event.title);
    });

    it('should validate fields correctly when creating an event', async () => {
      const response = await publishEvent({ title: '', description: '' });

      expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toHaveLength(2);
    });

    it('should not allow unauthenticated user delete an event', async () => {
      const event = await factory(Event).create();

      const response = await request(app.getHttpServer())
        .delete(`/events/${event.id}`)
        .set('Accept', 'application/json')
        .expect(HttpStatus.UNAUTHORIZED);

      expect(response.body.message).toEqual('Unauthorized');
    });

    it('should not allow non admin user delete an event', async () => {
      const event = await factory(Event).create();

      await authenticateUser();

      const response = await request(app.getHttpServer())
        .delete(`/events/${event.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.FORBIDDEN);

      expect(response.body.message).toEqual('Forbidden resource');
    });

    it('should allow admin user delete event', async () => {
      const event = await factory(Event).create();

      await authenticateUser({ isAdmin: true });

      const response = await request(app.getHttpServer())
        .delete(`/events/${event.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK);

      expect(response.body.affected).toEqual(1);
    });

    it('should not allow unauthenticated user update an event', async () => {
      const event = await factory(Event).create();

      const response = await request(app.getHttpServer())
        .put(`/events/${event.id}`)
        .set('Accept', 'application/json')
        .send({ title: 'updated title' })
        .expect(HttpStatus.UNAUTHORIZED);

      expect(response.body.message).toEqual('Unauthorized');
    });

    it('should not allow non admin user update an event', async () => {
      const event = await factory(Event).create();

      await authenticateUser();

      const response = await request(app.getHttpServer())
        .put(`/events/${event.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'updated title' })
        .expect(HttpStatus.FORBIDDEN);

      expect(response.body.message).toEqual('Forbidden resource');
    });

    it('should allow admin user update event', async () => {
      const event = await factory(Event).create();

      await authenticateUser({ isAdmin: true });

      const response = await request(app.getHttpServer())
        .put(`/events/${event.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...event, title: 'updated title' })
        .expect(HttpStatus.OK);

      expect(response.body.title).toEqual('updated title');
    });
  });

  async function publishEvent(
    overrides: Partial<Event> = {},
    userOverrides: Partial<User> = {},
  ) {
    const user = await factory(User).create({
      password: 'pass@erd',
      isAdmin: true,
      ...userOverrides,
    });

    const event = await factory(Event).make(overrides);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: user.email, password: 'pass@erd' });

    token = response.body.access_token;

    return request(app.getHttpServer())
      .post('/events')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(event);
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

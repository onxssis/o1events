import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as utils from './utils';

describe('EventsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
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

  describe('', () => {
    const event = {
      title: 'Exchanges Dev Summit II',
      description: 'sdmh sfjd the reload',
      location: 'doewb4r9o23 34334r4',
      lng: 4.322,
      lat: -1.23433,
      categories: [],
      startDate: '2021-01-02T16:35:22.251Z',
      endDate: '2021-01-02T16:35:22.251Z',
    };

    it('/events (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/events')
        .expect(200);
      expect(response.body.data).toEqual([]);
    });

    it('should not allow unauthenticated user create event', async () => {
      const response = await request(app.getHttpServer())
        .post('/events')
        .set('Accept', 'application/json')
        .send(event)
        .expect(HttpStatus.UNAUTHORIZED);

      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
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

  it('/events (GET)', () => {
    return request(app.getHttpServer()).get('/events').expect(200).expect([]);
  });
});

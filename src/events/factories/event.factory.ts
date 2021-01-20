import * as Faker from 'faker';
import slugify from 'slugify';
import { define } from '@/factory';
import { Event } from '../entities/event.entity';

define(Event, (faker: typeof Faker) => {
  const event = new Event();
  const title = faker.lorem.sentence();

  event.title = title;
  event.slug = slugify(title, { lower: true });
  event.description = faker.lorem.paragraphs();
  event.address = faker.address.streetAddress();
  event.lng = faker.address.longitude();
  event.lat = faker.address.latitude();
  event.categories = [];
  event.startDate = faker.date.recent();
  event.endDate = faker.date.future();

  return event;
});

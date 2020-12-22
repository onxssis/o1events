import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber as EntityEventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Event } from '../entities/event.entity';

@EntityEventSubscriber()
export class EventSubscriber implements EntitySubscriberInterface<Event> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Event;
  }

  beforeInsert(event: InsertEvent<Event>) {
    console.log(`BEFORE Event INSERTED: `, event.entity);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { EventSubscriber } from './subscribers/event.subscriber';
import { EventRepository } from './repositories/typeorm/event.repository';
import { Connection, getConnection } from 'typeorm';

// const repoServiceProvider = {
//   provide: 'EVENT_REPOSITORY',
//   // useClass: true ? EventRepository : EventRepository,
//   useFactory: (connection: Connection) => connection.getRepository(Event),
//   inject: [() => getConnection()],
// };

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository])],
  controllers: [EventsController],
  providers: [EventsService, EventSubscriber],
})
export class EventsModule {}

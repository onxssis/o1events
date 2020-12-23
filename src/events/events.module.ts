import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventRepository } from './repositories/typeorm/event.repository';
import { CategoriesModule } from '@/categories/categories.module';

const repoServiceProvider = [
  {
    provide: 'EVENT_REPOSITORY',
    useClass: EventRepository,
    // useFactory: () => new EventRepository(getConnection()),
    inject: [],
  },
];

@Module({
  imports: [CategoriesModule],
  controllers: [EventsController],
  providers: [EventsService, ...repoServiceProvider],
})
export class EventsModule {}

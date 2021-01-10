import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventRepository } from './repositories/typeorm/event.repository';
import { CategoriesModule } from '@/categories/categories.module';
import { EVENT_REPOSITORY } from '@/common/common.constants';

const repoServiceProvider = [
  {
    provide: EVENT_REPOSITORY,
    useClass: EventRepository,
    // useFactory: () => new EventRepository(getConnection()),
    inject: [],
  },
];

@Module({
  imports: [CategoriesModule],
  controllers: [EventsController],
  providers: [EventsService, ...repoServiceProvider],
  exports: [EventsService],
})
export class EventsModule {}

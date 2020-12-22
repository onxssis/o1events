import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';

import { dbConfig } from './ormconfig';
@Module({
  imports: [TypeOrmModule.forRoot(dbConfig as any), EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

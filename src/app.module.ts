import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TillService } from './till.service';
import { Till } from './till';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TillService, Till],
})
export class AppModule {}

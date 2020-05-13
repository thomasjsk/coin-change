import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TillService } from './till.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TillService],
})
export class AppModule {}

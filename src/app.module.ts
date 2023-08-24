import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OffersModule } from './offers/offers.module';
import { OffersService } from './offers/offers.service';

@Module({
  imports: [OffersModule],
  controllers: [AppController],
  providers: [AppService, OffersService],
})
export class AppModule {}

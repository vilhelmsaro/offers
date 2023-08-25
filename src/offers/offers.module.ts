import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { OfferServiceFactory } from './utils/offerServiceFactory';

console.log('HERE');
@Module({
  controllers: [OffersController],
  providers: [OfferServiceFactory],
})
export class OffersModule {}

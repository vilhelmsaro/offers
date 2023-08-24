import { Controller, Post, Param, Body } from '@nestjs/common';
import { OfferServiceFactory } from './utils/offerServiceFactory';

console.log('offerServiceFactory', OfferServiceFactory);

@Controller('offers')
export class OffersController {
  constructor(private readonly offerServiceFactory: OfferServiceFactory) {}

  @Post(':providerName')
  async processProviderPayload(
    @Param('providerName') providerName: string,
    @Body() providerPayload: any,
  ) {
    const offerService = this.offerServiceFactory.createService(providerName);
    await offerService.transformAndSaveProviderPayload(
      providerName,
      providerPayload,
    );
    return { message: 'Payload processed successfully' };
  }
}

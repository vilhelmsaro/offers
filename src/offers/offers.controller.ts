import { Controller, Post, Param, Body } from '@nestjs/common';
import { OfferServiceFactory } from './utils/offerServiceFactory';
import { ProviderPayloadDTO } from './dto/offer1-dto';

console.log('offerServiceFactory', OfferServiceFactory);

@Controller('offers')
export class OffersController {
  constructor(private readonly offerServiceFactory: OfferServiceFactory) {}

  @Post(':providerName')
  async processProviderPayload(
    @Param('providerName') providerName: string,
    @Body() providerPayload: ProviderPayloadDTO,
  ) {
    console.log('providerPayload', providerPayload);

    const offerService = this.offerServiceFactory.createService(providerName);
    
    await offerService.transformAndSaveProviderPayload(
      providerName,
      providerPayload.offers,// Offer1DTO[],
    );
    return { message: 'Payload processed successfully' };
  }
}

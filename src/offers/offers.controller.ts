import { Controller, Post } from '@nestjs/common';
import { OfferServiceFactory } from './utils/offerServiceFactory';
import { providerNames } from '../constants';
import { getAllResponses } from './utils/getAllOffers';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import AllProviderPayloads from './dto/offersPayloads';

console.log('offerServiceFactory', OfferServiceFactory);

@Controller('offers')
export class OffersController {
  constructor(private readonly offerServiceFactory: OfferServiceFactory) {}

  @Post('')
  async processProviderPayload() {
    // calling mock service
    const allOffers = await getAllResponses(providerNames);
    console.log('allOffers', allOffers);

    // process the responses
    providerNames.forEach((providerName) => {
      const offerService = this.offerServiceFactory.createService(providerName);

      // validate the payloads
      const validatedPayload = plainToInstance(
        AllProviderPayloads[providerName],
        allOffers[providerName],
      );
      const validationErrors = validateSync(validatedPayload); //if this is a simple validation of properties and their types, we don't need async validation

      if (validationErrors.length > 0) {
        console.warn('Validation error:', validationErrors);
        return;
      }

      offerService.transformAndSaveProviderPayload(
        providerName,
        validatedPayload,
      );
    });

    return { message: 'Payload processed successfully' };
  }
}

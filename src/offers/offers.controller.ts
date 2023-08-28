import { Controller, Post } from '@nestjs/common';
import { OfferServiceFactory } from './utils/offerServiceFactory';
import { getAllResponses } from './utils/getAllOffers';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { allOffersPayloads, providerNames } from './dto/offersPayloads';

@Controller('offers')
export class OffersController {
  constructor(private readonly offerServiceFactory: OfferServiceFactory) {}

  @Post('')
  async processProviderPayload() {
    // calling mock service
    // if you want to pass invalid data to the services, simply add 'true' as a second argument to the function below -> 'getAllResponses'
    const allOffers = await getAllResponses(providerNames);

    // process the responses
    providerNames.forEach((providerName) => {
      console.log('WORKING ON ', providerName);
      const offerService = this.offerServiceFactory.createService(providerName);

      // validate the payloads before getting to services
      const payload = plainToInstance(
        allOffersPayloads[providerName].payloadDTO,
        allOffers[providerName],
      );

      // validateSync - as we do not have any custom async validation logic
      const validationErrors = validateSync(payload);

      if (validationErrors.length > 0) {
        console.warn(`Invalid response by provider: ${providerName}`);
        return;
      }

      offerService.transformAndSaveProviderPayload(payload, providerName);
    });

    return { message: 'Payloads processed.' };
  }
}

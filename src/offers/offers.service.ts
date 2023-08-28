import { Injectable } from '@nestjs/common';
import { OfferEntity } from './entities/offer.entity';
import { ProviderConfig } from './utils/offerServiceFactory';
import { providerNames } from './dto/offersPayloads';

@Injectable()
export class OffersService {
  constructor(private readonly providerConfig: ProviderConfig) {}

  transformAndSaveProviderPayload(
    providerPayload,
    providerName: (typeof providerNames)[number],
  ) {
    const offers = this.providerConfig
      .getIterableOffers(providerPayload)
      .map((validatedOffers) => {
        return this.transformOffer(
          providerName,
          this.providerConfig.transformationLogic,
          validatedOffers,
        );
      });

    // this is where the data should be written to DB
    console.log('offers after transformation: ', offers);
  }

  private transformOffer(
    providerName: (typeof providerNames)[number],
    transformationLogic: (providerOffer, providerName) => Partial<OfferEntity>,
    offerDTO,
  ): Partial<OfferEntity> {
    return transformationLogic(offerDTO, providerName);
  }
}

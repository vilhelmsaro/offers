import { Injectable } from '@nestjs/common';
import { OfferEntity } from './entities/offer.entity';
import { ProviderConfig } from './utils/offerServiceFactory';

@Injectable()
export class OffersService {
  constructor(private readonly providerConfig: ProviderConfig) {}

  transformAndSaveProviderPayload(providerPayload) {
    const offers = this.providerConfig
      .getIterableOffers(providerPayload)
      .map((validatedOffers) => {
        return this.transformOffer(
          this.providerConfig.transformationLogic,
          validatedOffers,
        );
      });
    console.log('offers after transformation: ', offers);
  }

  private transformOffer(
    transformationLogic: (providerOffer) => Partial<OfferEntity>,
    offerDTO,
  ): Partial<OfferEntity> {
    return transformationLogic(offerDTO);
  }
}

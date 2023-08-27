import { Injectable } from '@nestjs/common';
import { OfferEntity } from './entities/offer.entity';
import { ProviderConfig } from './utils/offerServiceFactory';

@Injectable()
export class OffersService {
  constructor(private readonly providerConfig: ProviderConfig) {}

  transformAndSaveProviderPayload(providerName: string, providerPayload) {
    console.log('providerPayload', providerPayload);

    const offers = providerPayload.offers.map((validatedOffers) =>
      this.transformOffer(
        this.providerConfig.transformationLogic,
        validatedOffers,
      ),
    );
    console.log('offers after transform', offers);

    // await this.offerRepository.save(offers);
  }

  private transformOffer(
    transformationLogic: (providerOffer) => Partial<OfferEntity>,
    offerDTO,
  ): Partial<OfferEntity> {
    return transformationLogic(offerDTO);
  }
}

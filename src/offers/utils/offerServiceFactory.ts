import { OffersService } from '../offers.service';
import { OfferEntity } from '../entities/offer.entity';
import { providerNames } from '../../constants';
import offerConvertors from '../utils/offerConvertors';
import { allOffersPayloads, AllOfferIterables } from '../dto/offersPayloads';

export interface ProviderConfig {
  transformationLogic: (offer) => Partial<OfferEntity>;
  payloadDTO: object;
  getIterableOffers: (payload) => AllOfferIterables;
}

export class OfferServiceFactory {
  private providers: Map<string, ProviderConfig> = new Map();

  constructor() {
    // Load provider configurations and register them in the map

    providerNames.forEach((provider) => {
      this.providers.set(provider, {
        transformationLogic: offerConvertors[provider],
        payloadDTO: allOffersPayloads[provider],
        getIterableOffers: allOffersPayloads[provider].getIterableOffers,
      });
    });
  }

  createService(providerName: string): OffersService {
    const providerConfig = this.providers.get(providerName);

    if (!providerConfig) {
      throw new Error(`Provider configuration not found for ${providerName}`);
    }

    return new OffersService(providerConfig);
  }
}

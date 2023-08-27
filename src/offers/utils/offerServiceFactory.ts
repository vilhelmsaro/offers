import { OffersService } from '../offers.service';
import { Injectable } from '@nestjs/common';
import { Offer1DTO } from '../dto/offer1-dto';
import { OfferEntity } from '../entities/offer.entity';
import { providerNames } from '../../constants';
import offerConvertors from '../utils/offerConvertors';
import allOffersPayloads from '../dto/offersPayloads';

export interface ProviderConfig {
  transformationLogic: (offer: Offer1DTO) => Partial<OfferEntity>;
  payloadDTO: object;
}

@Injectable()
export class OfferServiceFactory {
  private providers: Map<string, ProviderConfig> = new Map();

  constructor() {
    // Load provider configurations and register them in the map

    providerNames.forEach((provider) => {
      this.providers.set(provider, {
        transformationLogic: offerConvertors[provider],
        payloadDTO: allOffersPayloads[provider],
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

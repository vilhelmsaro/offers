import { OffersService } from '../offers.service';
import { Injectable } from '@nestjs/common';
import { Offer1DTO } from '../dto/offer1-dto';
import { OfferEntity } from '../entities/offer.entity';

export interface ProviderConfig {
  validationRules: any[];
  transformationLogic: (offer: Offer1DTO) => Partial<OfferEntity>;
}

@Injectable()
export class OfferServiceFactory {
  private providers: Map<string, ProviderConfig> = new Map();

  constructor() {
    // Load provider configurations and register them in the map
    this.providers.set('provider1', {
      validationRules: [], // Define validation rules
      transformationLogic: (offer: Offer1DTO) => {
        // Implement transformation logic for provider1
        return {
          externalOfferId: offer.offer_id,
          name: offer.offer_name,
        };
      },
    });

    // Register other providers
  }

  createService(providerName: string): OffersService {
    const providerConfig = this.providers.get(providerName);

    if (!providerConfig) {
      throw new Error(`Provider configuration not found for ${providerName}`);
    }

    return new OffersService(providerConfig);
  }
}

import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { OfferEntity } from './entities/offer.entity';
import { Offer1DTO, ProviderPayloadDTO } from './dto/offer1-dto';
import {
  OfferServiceFactory,
  ProviderConfig,
} from './utils/offerServiceFactory';

@Injectable()
export class OffersService {
  constructor(private readonly providerConfig: ProviderConfig) {}

  async transformAndSaveProviderPayload(
    providerName: string,
    providerPayload: Offer1DTO[],
  ) {
    console.log("providerPayload", providerPayload);
    
    const validatedPayload = providerPayload.map((offers) => plainToClass(Offer1DTO, offers));
    const validationErrors = await validate(validatedPayload);

    if (validationErrors.length > 0) {
      console.warn('Validation error:', validationErrors);
      return;
    }

    console.log('validatedPayload', validatedPayload);
    const offers = validatedPayload.map((validatedOffers) =>
      this.transformOffer(this.providerConfig.transformationLogic, validatedOffers),
    );
    console.log('offers after transform', offers);

    // await this.offerRepository.save(offers);
  }

  private transformOffer(
    transformationLogic: (dto: Offer1DTO) => Partial<OfferEntity>,
    offerDTO: Offer1DTO,
  ): Partial<OfferEntity> {
    return transformationLogic(offerDTO);
  }
}

import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { OfferEntity } from './entities/offer.entity';
import { Offer1DTO, ProviderPayloadDTO } from './dto/offer1-dto';
import { ProviderConfig } from './utils/offerServiceFactory';

@Injectable()
export class OffersService {
  constructor(private readonly providerConfig: ProviderConfig) {}

  async transformAndSaveProviderPayload(
    providerName: string,
    providerPayload: any,
  ) {
    const validatedPayload = plainToClass(ProviderPayloadDTO, providerPayload);
    const validationErrors = await validate(validatedPayload);

    if (validationErrors.length > 0) {
      console.warn('Validation error:', validationErrors);
      return;
    }

    const offers = validatedPayload.offers.map((Offer1DTO) =>
      this.transformOffer(this.providerConfig.transformationLogic, Offer1DTO),
    );

    // await this.offerRepository.save(offers);
  }

  private transformOffer(
    transformationLogic: (dto: Offer1DTO) => Partial<OfferEntity>,
    offerDTO: Offer1DTO,
  ): Partial<OfferEntity> {
    return transformationLogic(offerDTO);
  }
}

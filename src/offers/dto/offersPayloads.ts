import { Provider1PayloadDTO, Offer1DTO } from './offer1-dto';
import { Provider2PayloadDTO, IterableOffer2 } from './offer2-dto';

export const allOffersPayloads = {
  offer1: {
    payloadDTO: Provider1PayloadDTO,
    getIterableOffers: (payload) => payload.response.offers,
  },
  offer2: {
    payloadDTO: Provider2PayloadDTO,
    getIterableOffers: (payload) => {
      return Object.values(payload.data);
    },
  },
};

export type AllOfferIterables = IterableOffer2[] | Offer1DTO[];

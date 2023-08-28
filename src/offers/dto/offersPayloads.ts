// whenever we want to scale the service to handle more offer payloads,
// we just need to add all the necessary properties here, the properties being
// 1-DTOs of the payload, and the offer data itself
// 2-allOffersPayloads[offerServiceName] = {payloadDTO, getIterableOffers}
// 3-AllOfferIterables - Union type of the offer types (to specify the type of the return of the functon ProviderConfig.getIterableOffers)
// every payload is different, so the function 'getIterableOffers' defines the place to where look exactly for offers in a particular offersPayload

// also, you need to specify the logic of data conversion inside '/utils/{offerName}Convertor.ts' script
// and export them from within  '/utils/offerConvertors.ts'

// note: explicitly retrning an array in 'getIterableOffers' function(even if there is only one offer)
// in order to always be able to run a loop on the offers data

// do not forget to add offer-specific keywords in constants.ts if need be

import { Provider1PayloadDTO, Offer1DTO } from './offer1-dto';
import { Provider2PayloadDTO, IterableOffer2 } from './offer2-dto';
import { Provider3PayloadDTO, Offer3DTO } from './offer-3-experimental-dto';

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
  offer3: {
    payloadDTO: Provider3PayloadDTO,
    getIterableOffers: (payload) => payload.response.offers,
  },
};

export type AllOfferIterables = IterableOffer2[] | Offer1DTO[] | Offer3DTO[];

export const providerNames = ['offer1', 'offer2', 'offer3'];

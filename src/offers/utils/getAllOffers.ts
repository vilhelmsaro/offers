// return all the responses(mock data, with one invalid data sample)
import { allOffers } from './dummy-offers';

export function getAllResponses(offerNames, errorFlag = false) {
  return new Promise((resolve) => {
    if (errorFlag) {
      return resolve({
        offer1: allOffers.offer1Invalid,
        offer2: allOffers.offer2Invalid,
        offer3: allOffers.offer3Invalid,
      });
    }
    resolve({
      offer1: allOffers.offer1,
      offer2: allOffers.offer2,
      offer3: allOffers.offer3,
    });
  });
}

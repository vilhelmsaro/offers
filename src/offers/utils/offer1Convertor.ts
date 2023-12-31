import { Offer1DTO } from '../dto/offer1-dto';
import { keywords } from '../../constants';

export function offer1Convertor(offer: Offer1DTO, providerName) {
  // Implement transformation logic for provider1
  const currKeywords = keywords[providerName];

  return {
    providerName,
    externalOfferId: offer.offer_id,
    name: offer.offer_name,
    description: offer.offer_desc,
    requirements: offer.call_to_action,
    offerUrlTemplate: offer.offer_url,
    isDesktop: offer.platform === currKeywords.DESKTOP,
    isAndroid: offer.device !== currKeywords.IPHONE_IPAD,
    isIos: offer.device === currKeywords.IPHONE_IPAD,
    thumbnail: offer.image_url,
  };
}

import { Offer3DTO } from '../dto/offer-3-experimental-dto';
import { keywords } from '../../constants';

export function offer3Convertor(offer: Offer3DTO, providerName) {
  // Implement transformation logic for provider1
  const currKeywords = keywords[providerName];

  return {
    providerName,
    externalOfferId: offer.offer_id3,
    name: offer.offer_name3,
    description: offer.offer_desc3,
    requirements: offer.call_to_action,
    offerUrlTemplate: offer.offer_url,
    isDesktop: offer.platform === currKeywords.DESKTOP,
    isAndroid: offer.device !== currKeywords.IPHONE_IPAD,
    isIos: offer.device === currKeywords.IPHONE_IPAD,
    thumbnail: offer.image_url,
  };
}

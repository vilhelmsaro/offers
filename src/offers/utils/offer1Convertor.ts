import { Offer1DTO } from '../dto/offer1-dto';

export function offer1Convertor(offer: Offer1DTO) {
  // Implement transformation logic for provider1
  return {
    externalOfferId: offer.offer_id,
    name: offer.offer_name,
    description: offer.offer_desc,
    requirements: offer.call_to_action,
    offerUrlTemplate: offer.offer_url,
    isDesktop: offer.platform === 'desktop',
    isAndroid: offer.device !== 'iphone_ipad',
    isIos: offer.device === 'iphone_ipad',
    thumbnail: offer.image_url,
  };
}

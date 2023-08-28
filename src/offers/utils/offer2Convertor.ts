import { IterableOffer2 } from '../dto/offer2-dto';
//todo add constants with desktop and etc.

export function offer2Convertor(offer: IterableOffer2) {
  // Implement transformation logic for provider1
  return {
    externalOfferId: offer.Offer.campaign_id,
    thumbnail: offer.Offer.icon,
    name: offer.Offer.name,
    offerUrlTemplate: offer.Offer.tracking_url,
    requirements: offer.Offer.instructions,
    description: offer.Offer.description,
    isAndroid: offer.OS.android,
    isIos: offer.OS.ios,
    isDesktop: offer.OS.web,
  };
}

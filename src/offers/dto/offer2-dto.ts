import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class Offer {
  @IsNotEmpty()
  @IsNumber()
  campaign_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  offer_desc: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsUrl()
  tracking_url: string;

  @IsNotEmpty()
  @IsUrl()
  instructions: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

class OS {
  @IsNotEmpty()
  @IsBoolean()
  android: boolean;

  @IsNotEmpty()
  @IsBoolean()
  ios: boolean;

  @IsNotEmpty()
  @IsBoolean()
  web: boolean;
}

export class IterableOffer2 {
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => Offer)
  Offer: Offer;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => OS)
  OS: OS;
}

class Data {
  [campaignId: string]: IterableOffer2;
}

export class Provider2PayloadDTO {
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => Data)
  data: Data;
}

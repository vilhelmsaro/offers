import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Offer1DTO {
  @IsNotEmpty()
  @IsString()
  offer_id: string;

  @IsNotEmpty()
  @IsString()
  offer_name: string;

  @IsNotEmpty()
  @IsString()
  offer_desc: string;

  @IsNotEmpty()
  @IsString()
  call_to_action: string;

  @IsNotEmpty()
  @IsUrl()
  offer_url: string;

  @IsNotEmpty()
  @IsUrl()
  image_url: string;

  @IsNotEmpty()
  @IsString()
  platform: string;

  @IsNotEmpty()
  @IsString()
  device: string;
}

class Query {
  @IsNotEmpty()
  @IsString()
  pubid: string;

  @IsNotEmpty()
  @IsString()
  appid: number;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  platform: string;
}

export class Provider1PayloadDTO {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Offer1DTO)
  offers: Offer1DTO[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Query)
  query: Query;
}

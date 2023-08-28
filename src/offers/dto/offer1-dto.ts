import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
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
  @IsNumber()
  appid: number;

  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  platform: string;
}

class Response {
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Offer1DTO)
  offers: Offer1DTO[];
}

export class Provider1PayloadDTO {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Response)
  response: Response;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Query)
  query: Query;
}

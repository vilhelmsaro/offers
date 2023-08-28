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

export class Offer3DTO {
  @IsNotEmpty()
  @IsString()
  offer_id3: string;

  @IsNotEmpty()
  @IsString()
  offer_name3: string;

  @IsNotEmpty()
  @IsString()
  offer_desc3: string;

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
  @Type(() => Offer3DTO)
  offers: Offer3DTO[];
}

export class Provider3PayloadDTO {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Response)
  response: Response;
}

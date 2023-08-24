import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class Offer1DTO {
  @IsNotEmpty()
  @IsString()
  offer_id: string;

  @IsNotEmpty()
  @IsString()
  offer_name: string;
}

export class ProviderPayloadDTO {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Offer1DTO)
  offers: Offer1DTO[];
}

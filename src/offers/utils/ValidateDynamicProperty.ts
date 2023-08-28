// this whole thing also could be improved to be extensible in the future!
// now only for offer2 provider
import { plainToInstance } from 'class-transformer';
import { ValidationOptions, ValidateBy, validateSync } from 'class-validator';
import { IterableOffer2 } from '../dto/offer2-dto';

export function ValidateDynamicProperty(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    ValidateBy(
      {
        name: 'validateDynamicProperty',
        constraints: [propertyName],
        validator: {
          validate(value: any) {
            const dynamicKeys = Object.keys(value);

            return dynamicKeys.some((key) => {
              const currOffer = plainToInstance(IterableOffer2, value[key]);

              // validateSync - as we do not have any custom async validation logic
              return validateSync(currOffer).length === 0;
            });
          },
        },
      },
      validationOptions,
    )(object, propertyName);
  };
}

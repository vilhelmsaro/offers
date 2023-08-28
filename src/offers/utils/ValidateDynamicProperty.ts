import { plainToInstance } from 'class-transformer';
import {
  ValidationOptions,
  ValidateBy,
  ValidationArguments,
  validateSync,
} from 'class-validator';
import { IterableOffer2 } from '../dto/offer2-dto';

export function ValidateDynamicProperty(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    ValidateBy(
      {
        name: 'validateDynamicProperty', // Unique validation name
        constraints: [propertyName],
        validator: {
          validate(value: any, args: ValidationArguments) {
            const dynamicKeys = Object.keys(value);

            dynamicKeys.forEach((key) => {
              const currOffer = plainToInstance(IterableOffer2, value[key]);
              console.log('currOffer', currOffer);

              // validateSync - as we do not have any custom async validation logic
              const validationErrors = validateSync(currOffer);
              if (validationErrors.length > 0) {
                console.warn(
                  `Invalid response by provider:}`,
                  validationErrors[0].children,
                );
                return false;
              }
            });
            // validate the payloads before getting to services

            // Add your validation logic here
            // Return true if the value is valid, otherwise return false
            return true;
          },
        },
      },
      validationOptions,
    )(object, propertyName);
  };
}

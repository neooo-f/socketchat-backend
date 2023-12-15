import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { ImageType } from '../enums/image-type.enum';

@ValidatorConstraint({ name: 'isValidProfileImage', async: false })
export class IsValidProfileImageValidator
  implements ValidatorConstraintInterface
{
  validate(value: Express.Multer.File): boolean | Promise<boolean> {
    console.log(value.size);
    return Object.values(ImageType).includes(value.mimetype as ImageType);
  }

  defaultMessage(): string {
    return 'Given Filetype is not allowed!';
  }
}

export function IsValidProfileImage() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: IsValidProfileImageValidator,
    });
  };
}

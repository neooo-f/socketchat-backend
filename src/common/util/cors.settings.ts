import { UnauthorizedException } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ErrorCodes } from '../enums/error-codes.enum';

export const getCorsSettings = (allowedOrigins: string[]): CorsOptions => ({
  origin(
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void,
  ): void {
    if (
      allowedOrigins.length === 0 ||
      allowedOrigins.includes(origin) ||
      !origin
    ) {
      return callback(null, true);
    }
    return callback(
      new UnauthorizedException(
        'Origin not allowed.',
        ErrorCodes.FORBIDDEN_ORIGIN,
      ),
    );
  },
  credentials: true,
});

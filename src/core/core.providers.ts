import { ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

export const CORE_PROVIDERS = [
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  },
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
];

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  selectHello(): string {
    return 'Hello World!';
  }
  calculateSquareRoot(number: number): number {
    if (number < 0) throw new Error('Business Rule: Number must be greater than 0');
    return Math.sqrt(number);
  }
  calculateSquareRootSafe(number: number): number {
    return Math.sqrt(number);
  }
}

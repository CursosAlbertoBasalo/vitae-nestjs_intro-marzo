import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  ParseIntPipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PositiveNumberPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<number> {
    const numero: number = await new ParseIntPipe().transform(value, metadata);
    if (numero < 0)
      throw new HttpException('👮 Number must be greater than 0', HttpStatus.BAD_REQUEST);
    return numero;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ description: 'The client name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  client: string;

  @IsNumber()
  passengers: number;

  @IsString()
  tripId: string;

  @IsString()
  creditCard: string;
}

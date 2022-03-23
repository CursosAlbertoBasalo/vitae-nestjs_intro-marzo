import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  client: string;

  @IsNumber()
  passengers: number;

  @IsString()
  tripId: string;
}

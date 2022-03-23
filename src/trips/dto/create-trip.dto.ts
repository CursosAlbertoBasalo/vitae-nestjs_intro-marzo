import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsNumber()
  price: number;

  @IsNumber()
  places: number;

  @IsString()
  agencyId: string;
}

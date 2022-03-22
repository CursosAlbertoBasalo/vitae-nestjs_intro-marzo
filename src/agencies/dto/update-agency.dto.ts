import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAgencyDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  range: string;
}

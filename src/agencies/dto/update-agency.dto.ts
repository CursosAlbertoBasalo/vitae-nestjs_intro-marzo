import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Ranges } from '../models/range.enum';
import { Status } from '../models/status.enum';

export class UpdateAgencyDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsString()
  name: string;

  @IsEnum(Ranges)
  range: Ranges;

  @IsEnum(Status)
  status: Status;
}

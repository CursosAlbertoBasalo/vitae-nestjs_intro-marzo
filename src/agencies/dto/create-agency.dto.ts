import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAgencyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

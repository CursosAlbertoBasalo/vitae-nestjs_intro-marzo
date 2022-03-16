import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { AgencyDto } from './dto/agency.dto';

@Injectable()
export class AgenciesService {
  constructor(private readonly utilsService: UtilsService) {}

  selectAll(): AgencyDto[] {
    return [];
  }
  insert(agency: AgencyDto): AgencyDto {
    agency.id = this.utilsService.createGUID();
    return agency;
  }
}

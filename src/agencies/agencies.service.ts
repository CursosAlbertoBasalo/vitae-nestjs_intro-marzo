import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { AgencyDto } from './dto/agency.dto';

@Injectable()
export class AgenciesService {
  private readonly agencies: Partial<AgencyDto>[] = [];

  constructor(private readonly utilsService: UtilsService) {}

  selectAll(): AgencyDto[] {
    return this.agencies;
  }
  findById(id: string): Partial<AgencyDto> {
    return this.agencies.find((agency) => agency.id === id);
  }
  insert(agency: AgencyDto): AgencyDto {
    agency.id = this.utilsService.createGUID();
    this.agencies.push(agency);
    return agency;
  }
}

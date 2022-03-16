import { Body, Controller, Get, Post } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgencyDto } from './dto/agency.dto';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
  getAll(): AgencyDto[] {
    return this.agenciesService.selectAll();
  }
  @Post()
  postAgency(@Body() agency: AgencyDto): AgencyDto {
    return this.agenciesService.insert(agency);
  }
}

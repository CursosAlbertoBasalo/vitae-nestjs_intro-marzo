import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgencyDto } from './dto/agency.dto';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
  getAll(): AgencyDto[] {
    return this.agenciesService.selectAll();
  }
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.agenciesService.findById(id);
  }
  @Post()
  postAgency(@Body() agency: AgencyDto): AgencyDto {
    return this.agenciesService.insert(agency);
  }
}

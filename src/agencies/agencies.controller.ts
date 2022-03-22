import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}
  @Get()
  getAll() {
    return this.agenciesService.findAll();
  }
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.agenciesService.findById(id);
  }
  @Post()
  create(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    agency: CreateAgencyDto,
  ) {
    return this.agenciesService.create(agency);
  }
  @Put()
  update(@Body() agency: UpdateAgencyDto) {
    return this.agenciesService.update(agency);
  }
}

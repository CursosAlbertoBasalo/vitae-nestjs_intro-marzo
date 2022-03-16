import { Controller, Get } from '@nestjs/common';
import { UtilsService } from './utils.service';

@Controller('')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Get('')
  getGUID(): string {
    return this.utilsService.createGUID();
  }
}

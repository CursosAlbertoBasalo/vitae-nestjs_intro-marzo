import { Module } from '@nestjs/common';
import { AgenciesController } from './agencies.controller';
import { AgenciesService } from './agencies.service';

@Module({
  // imports: [UtilsModule],
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}

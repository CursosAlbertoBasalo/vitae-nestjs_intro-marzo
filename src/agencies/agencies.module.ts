import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgenciesController } from './agencies.controller';
import { AgenciesService } from './agencies.service';
import { Agency, AgencySchema } from './entities/agency.entity';

@Module({
  // imports: [UtilsModule],
  imports: [MongooseModule.forFeature([{ name: Agency.name, schema: AgencySchema }])],
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}

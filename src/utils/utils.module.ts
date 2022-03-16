import { Global, Module } from '@nestjs/common';
import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';

@Global()
@Module({
  controllers: [UtilsController],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}

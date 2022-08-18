import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestRepository } from './request.repository';
import { ComplectationService } from 'src/complectation/complectation.service';
import { ComplectationRepository } from 'src/complectation/complectation.repository';
import { ComponentService } from 'src/component/component.service';
import { ComponentRepository } from 'src/component/component.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RequestRepository,
      ComplectationRepository,
      ComponentRepository,
    ]),
  ],
  controllers: [RequestController],
  providers: [RequestService, ComplectationService, ComponentService],
  exports: [RequestService],
})
export class RequestModule {}

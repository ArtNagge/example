import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentRepository } from 'src/component/component.repository';
import { ComponentService } from 'src/component/component.service';
import { ComplectationController } from './complectation.controller';
import { ComplectationRepository } from './complectation.repository';
import { ComplectationService } from './complectation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ComplectationRepository, ComponentRepository]),
  ],
  controllers: [ComplectationController],
  providers: [ComplectationService, ComponentService],
  exports: [ComplectationService],
})
export class ComplectationModule {}

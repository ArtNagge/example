import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeComponentsController } from './typeComponents.controller';
import { TypeComponentsRepository } from './typeComponents.repository';
import { TypeComponentsService } from './typeComponents.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeComponentsRepository])],
  controllers: [TypeComponentsController],
  providers: [TypeComponentsService],
  exports: [TypeComponentsService],
})
export class TypeComponentsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentController } from './component.controller';
import { ComponentRepository } from './component.repository';
import { ComponentService } from './component.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentRepository])],
  controllers: [ComponentController],
  providers: [ComponentService],
  exports: [ComponentService],
})
export class ComponentsModule {}

import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from './../users/users.repository';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyRepository, UsersRepository]),
    forwardRef(() => UsersModule),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}

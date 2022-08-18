import { PickType } from '@nestjs/swagger';
import { CompanyDto } from './company.dto';

export class CompanyCreateDto extends PickType(CompanyDto, ['name', 'inn']) {}

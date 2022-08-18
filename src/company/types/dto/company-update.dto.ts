import { OmitType, PartialType } from '@nestjs/swagger';
import { CompanyDto } from './company.dto';

export class CompanyUpdateDto extends PartialType(
  OmitType(CompanyDto, ['id', 'name', 'inn']),
) {}

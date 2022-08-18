import { OmitType } from '@nestjs/swagger';
import { ComponentDto } from './component.dto';

export class ComponentFindDto extends OmitType(ComponentDto, ['type']) {}

import { PickType } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class ProductCreateDto extends PickType(ProductDto, ['name', 'slug']) {}

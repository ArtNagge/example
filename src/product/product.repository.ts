import { EntityRepository, Repository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
  private readonly alias = 'product';

  async deleteCompanyById(id: number) {
    return this.delete({ id });
  }
}

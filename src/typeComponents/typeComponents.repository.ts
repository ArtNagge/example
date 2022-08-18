import { EntityRepository, Repository } from 'typeorm';
import { TypeComponentsEntity } from './entity/typeComponents.entity';

@EntityRepository(TypeComponentsEntity)
export class TypeComponentsRepository extends Repository<TypeComponentsEntity> {
  private readonly alias = 'typeComponents';

  async deleteCompanyById(id: number) {
    return this.delete({ id });
  }
}

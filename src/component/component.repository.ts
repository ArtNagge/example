import { EntityRepository, Repository } from 'typeorm';
import { ComponentEntity } from './entity/component.entity';

@EntityRepository(ComponentEntity)
export class ComponentRepository extends Repository<ComponentEntity> {
  private readonly alias = 'component';

  async deleteCompanyById(id: number) {
    return this.delete({ id });
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { ComplectationEntity } from './entity/complectation.entity';

@EntityRepository(ComplectationEntity)
export class ComplectationRepository extends Repository<ComplectationEntity> {
  private readonly alias = 'complectation';

  async deleteCompanyById(id: number) {
    return this.delete({ id });
  }
}

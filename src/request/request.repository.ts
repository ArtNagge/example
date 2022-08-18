import { EntityRepository, Repository } from 'typeorm';
import { RequestEntity } from './entity/request.entity';

@EntityRepository(RequestEntity)
export class RequestRepository extends Repository<RequestEntity> {
  private readonly alias = 'request';

  async deleteCompanyById(id: number) {
    return this.delete({ id });
  }
}

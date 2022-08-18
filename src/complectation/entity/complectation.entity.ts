import { ComponentEntity } from 'src/component/entity/component.entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import { RequestEntity } from 'src/request/entity/request.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('complectation')
export class ComplectationEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.complectations)
  product: ProductEntity;

  @Column({ type: 'jsonb' })
  components: ComponentEntity[];

  @Column({ type: 'integer', nullable: false, default: 0 })
  count: number;

  @Column({ type: 'varchar', length: 300, default: '' })
  comment: string;

  @ManyToOne(() => RequestEntity, (request) => request.complectations)
  request: RequestEntity;
}

import { ComplectationEntity } from 'src/complectation/entity/complectation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 300, default: '' })
  name: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  slug: string;

  @OneToMany(
    () => ComplectationEntity,
    (complectation) => complectation.product,
    {
      cascade: true,
    },
  )
  complectations: ComplectationEntity[];
}

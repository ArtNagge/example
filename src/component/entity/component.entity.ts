import { TypeComponentsEntity } from 'src/typeComponents/entity/typeComponents.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('component')
export class ComponentEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'integer', nullable: false, default: 0 })
  price: number;

  @Column({ type: 'integer', nullable: false, default: 0 })
  sort: number;

  @ManyToOne(() => TypeComponentsEntity, (type) => type.components)
  type: TypeComponentsEntity;
}

import { ComponentEntity } from 'src/component/entity/component.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('typeComponents')
export class TypeComponentsEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  slug: string;

  @OneToMany(() => ComponentEntity, (component) => component.type, {
    cascade: true,
  })
  components: ComponentEntity[];
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusCompany1657796215541 implements MigrationInterface {
  name = 'AddStatusCompany1657796215541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."company_status_enum" AS ENUM('1', '2', '4', '8')`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "status" "public"."company_status_enum" NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."company_status_enum"`);
  }
}

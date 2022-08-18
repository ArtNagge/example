import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovePriceShots1660042365358 implements MigrationInterface {
    name = 'RemovePriceShots1660042365358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shots" DROP COLUMN "price"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shots" ADD "price" integer NOT NULL DEFAULT '0'`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class Configurator1660487798626 implements MigrationInterface {
    name = 'Configurator1660487798626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "name" character varying(300) NOT NULL DEFAULT '', "slug" character varying(300) NOT NULL DEFAULT '', CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "complectation" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "components" jsonb NOT NULL, "count" integer NOT NULL DEFAULT '0', "comment" character varying(300) NOT NULL DEFAULT '', "productId" integer, "requestId" integer, CONSTRAINT "PK_d185533dcb56a96c11de23b8d0f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."request_status_enum" AS ENUM('processing', 'success')`);
        await queryRunner.query(`CREATE TABLE "request" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."request_status_enum" NOT NULL DEFAULT 'processing', "userId" integer, CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "typeComponents" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "name" character varying(300) NOT NULL, "slug" character varying(300) NOT NULL, CONSTRAINT "PK_e15e5342a7fc141f6f1ea82a276" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "component" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "name" character varying(300) NOT NULL, "price" integer NOT NULL DEFAULT '0', "sort" integer NOT NULL DEFAULT '0', "typeId" integer, CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "complectation" ADD CONSTRAINT "FK_63e26ec12a3700813e8ae12eef4" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "complectation" ADD CONSTRAINT "FK_14a69ce1a78de5d256daaeb0666" FOREIGN KEY ("requestId") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_38554ade327a061ba620eee948b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_9ef9a484742b3e0cccf7ee63cf6" FOREIGN KEY ("typeId") REFERENCES "typeComponents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_9ef9a484742b3e0cccf7ee63cf6"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_38554ade327a061ba620eee948b"`);
        await queryRunner.query(`ALTER TABLE "complectation" DROP CONSTRAINT "FK_14a69ce1a78de5d256daaeb0666"`);
        await queryRunner.query(`ALTER TABLE "complectation" DROP CONSTRAINT "FK_63e26ec12a3700813e8ae12eef4"`);
        await queryRunner.query(`DROP TABLE "component"`);
        await queryRunner.query(`DROP TABLE "typeComponents"`);
        await queryRunner.query(`DROP TABLE "request"`);
        await queryRunner.query(`DROP TYPE "public"."request_status_enum"`);
        await queryRunner.query(`DROP TABLE "complectation"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}

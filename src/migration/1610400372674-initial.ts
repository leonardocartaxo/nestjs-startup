import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1610400372674 implements MigrationInterface {
  name = 'initial1610400372674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users" (
            "id" SERIAL NOT NULL,
            "createdOn" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedOn" TIMESTAMP NOT NULL DEFAULT now(),
            "deletedAt" TIMESTAMP,
            "name" character varying NOT NULL,
            "email" character varying NOT NULL,
            "hashedPassword" character varying NOT NULL,
            "roles" character varying array NOT NULL DEFAULT '{USER}' :: varchar [],
            CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

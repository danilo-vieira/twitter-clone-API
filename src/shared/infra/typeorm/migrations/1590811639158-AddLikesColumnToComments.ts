import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddLikesColumnToComments1590811639158
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'comments',
      new TableColumn({
        name: 'likes',
        type: 'integer',
        default: 0,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('comments', 'likes');
  }
}

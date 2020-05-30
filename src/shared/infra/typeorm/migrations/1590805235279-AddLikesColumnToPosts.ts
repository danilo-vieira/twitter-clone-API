import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddLikeColumnToPosts1590805235279
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'posts',
      new TableColumn({
        name: 'likes',
        type: 'integer',
        default: 0,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('posts', 'likes');
  }
}

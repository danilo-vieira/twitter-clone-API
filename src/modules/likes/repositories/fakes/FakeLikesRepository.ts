import { uuid } from 'uuidv4';

import IFindRelationDTO from '@modules/likes/dtos/IFindRelationDTO';
import ICreateRelationDTO from '@modules/likes/dtos/ICreateRelationDTO';

import Like from '@modules/likes/infra/typeorm/entities/Likes';
import ILikesRepository from '../ILikesRepository';

export default class FakeLikesRepository implements ILikesRepository {
  private likes: Like[] = [];

  public async findByIds({
    user_id,
    post_comment_id,
  }: IFindRelationDTO): Promise<Like | undefined> {
    return this.likes.find(
      like =>
        like.post_comment_id === post_comment_id && like.user_id === user_id
    );
  }

  public async create({
    user_id,
    post_comment_id,
  }: ICreateRelationDTO): Promise<void> {
    const newLike = new Like();

    Object.assign(newLike, { id: uuid(), user_id, post_comment_id });

    this.likes.push(newLike);
  }

  public async delete(id: string): Promise<void> {
    const likeIndex = this.likes.findIndex(like => like.id === id);

    this.likes.splice(likeIndex, 1);
  }
}

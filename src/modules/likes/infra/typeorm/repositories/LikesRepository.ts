import { Repository, getRepository } from 'typeorm';

import ILikesRepository from '@modules/likes/repositories/ILikesRepository';

import IFindRelationDTO from '@modules/likes/dtos/IFindRelationDTO';
import ICreateRelationDTO from '@modules/likes/dtos/ICreateRelationDTO';
import Like from '../entities/Likes';

export default class LikesRepository implements ILikesRepository {
  private ormRepository: Repository<Like>;

  constructor() {
    this.ormRepository = getRepository(Like);
  }

  public async findByIds({
    user_id,
    post_comment_id,
  }: IFindRelationDTO): Promise<Like | undefined> {
    const likeFound = await this.ormRepository.findOne({
      where: {
        user_id,
        post_comment_id,
      },
    });

    return likeFound;
  }

  public async create({
    user_id,
    post_comment_id,
  }: ICreateRelationDTO): Promise<void> {
    const createdLike = this.ormRepository.create({
      user_id,
      post_comment_id,
    });

    await this.ormRepository.save(createdLike);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

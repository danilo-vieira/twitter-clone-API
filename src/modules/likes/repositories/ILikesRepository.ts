import IFindRelationDTO from '../dtos/IFindRelationDTO';
import ICreateRelationDTO from '../dtos/ICreateRelationDTO';

import Like from '../infra/typeorm/entities/Likes';

export default interface ILikesRepository {
  findByIds({
    user_id,
    post_comment_id,
  }: IFindRelationDTO): Promise<Like | undefined>;
  create({ user_id, post_comment_id }: ICreateRelationDTO): Promise<void>;
  delete(id: string): Promise<void>;
}

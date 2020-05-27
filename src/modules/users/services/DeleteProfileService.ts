import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class DeleteProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<void> {
    const userFound = await this.usersRepository.findById(user_id);

    if (!userFound) {
      throw new AppError('User not found.');
    }

    await this.usersRepository.delete(user_id);
  }
}

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const userFound = await this.usersRepository.findById(user_id);

    if (!userFound) {
      throw new AppError('User not found');
    }

    const anotherUserWithSameEmail = await this.usersRepository.findByEmail(
      email
    );

    if (anotherUserWithSameEmail && anotherUserWithSameEmail.id !== user_id) {
      throw new AppError('E-mail address already used');
    }

    userFound.name = name;
    userFound.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password'
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        userFound.password
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      const hashedPassword = await this.hashProvider.generateHash(password);

      userFound.password = hashedPassword;
    }

    return this.usersRepository.save(userFound);
  }
}

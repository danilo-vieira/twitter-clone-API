import { injectable, inject } from 'tsyringe';

import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userFound = await this.usersRepository.findByEmail(email);

    if (!userFound) {
      throw new AppError('Incorrect e-mail/password combination');
    }

    const checkPassword = await this.hashProvider.compareHash(
      password,
      userFound.password
    );

    if (!checkPassword) {
      throw new AppError('Incorrect e-mail/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ name: userFound.name }, secret, {
      subject: userFound.id,
      expiresIn,
    });

    return {
      user: userFound,
      token,
    };
  }
}

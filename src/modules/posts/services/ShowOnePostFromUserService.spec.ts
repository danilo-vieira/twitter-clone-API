import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

import ShowOnePostFromUserService from './ShowOnePostFromUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakePostsRepository: FakePostsRepository;
let showOnePostFromUser: ShowOnePostFromUserService;

describe('ShowOnePostFromUser', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    showOnePostFromUser = new ShowOnePostFromUserService(
      fakePostsRepository,
      fakeUsersRepository
    );
  });

  it('should be able to list one post from user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    });

    const postFound = await showOnePostFromUser.execute({
      user_id: user.id,
      post_id: post.id,
    });

    expect(postFound.id).toEqual(post.id);
  });

  it('should not be able to show a non existing post', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    expect(
      showOnePostFromUser.execute({
        post_id: 'non-existing-id',
        user_id: user.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to show a post of a non existing user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    });

    expect(
      showOnePostFromUser.execute({
        post_id: post.id,
        user_id: 'non-existing-user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to show a post of another user', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const userTwo = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const post = await fakePostsRepository.create({
      user_id: userOne.id,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    });

    expect(
      showOnePostFromUser.execute({
        post_id: post.id,
        user_id: userTwo.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

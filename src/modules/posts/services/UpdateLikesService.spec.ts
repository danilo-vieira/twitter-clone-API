import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeLikesRepository from '@modules/likes/repositories/fakes/FakeLikesRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

import UpdateLikesService from './UpdateLikesService';

let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeLikesRepository: FakeLikesRepository;

let updateLikes: UpdateLikesService;

describe('UpdateLikes', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeLikesRepository = new FakeLikesRepository();

    updateLikes = new UpdateLikesService(
      fakePostsRepository,
      fakeUsersRepository,
      fakeLikesRepository
    );
  });

  it('should be able to like a post', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    });

    const updatedPost = await updateLikes.execute({
      user_id: user.id,
      post_id: post.id,
    });

    expect(updatedPost.likes).toBe(1);
  });

  it('should be able to unlike a post', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    });

    await updateLikes.execute({
      user_id: user.id,
      post_id: post.id,
    });

    const updatedPost = await updateLikes.execute({
      user_id: user.id,
      post_id: post.id,
    });

    expect(updatedPost.likes).toBe(0);
  });

  it('should not be able to like or unlike a post with a non existing user', async () => {
    expect(
      updateLikes.execute({
        user_id: 'wrong-id',
        post_id: 'wrong-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to like or unlike a non existing post', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    expect(
      updateLikes.execute({
        user_id: user.id,
        post_id: 'wrong-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

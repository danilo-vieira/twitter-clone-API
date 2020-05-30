import AppError from '@shared/errors/AppError';

import FakePostsRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeLikesRepository from '@modules/likes/repositories/fakes/FakeLikesRepository';
import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';

import UpdateLikesService from './UpdateLikesService';

let fakeCommentsRepository: FakeCommentsRepository;
let fakeLikesRepository: FakeLikesRepository;
let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let updateLikes: UpdateLikesService;

describe('UpdateLikes', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    fakeLikesRepository = new FakeLikesRepository();
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    updateLikes = new UpdateLikesService(
      fakeCommentsRepository,
      fakeUsersRepository,
      fakeLikesRepository
    );
  });

  it('should be able to like a comment', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content: 'This test is awesome!',
    });

    const createdComment = await fakeCommentsRepository.create({
      user_id: user.id,
      post_id: post.id,
      content: 'Yeah! Im sure it is.',
    });

    const updatedComment = await updateLikes.execute({
      user_id: user.id,
      comment_id: createdComment.id,
    });

    expect(updatedComment.id).toBe(createdComment.id);
    expect(updatedComment.likes).toBe(1);
  });

  it('should be able to unlike a comment', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content: 'This test is awesome!',
    });

    const createdComment = await fakeCommentsRepository.create({
      user_id: user.id,
      post_id: post.id,
      content: 'Yeah! Im sure it is.',
    });

    await updateLikes.execute({
      user_id: user.id,
      comment_id: createdComment.id,
    });

    const updatedComment = await updateLikes.execute({
      user_id: user.id,
      comment_id: createdComment.id,
    });

    expect(updatedComment.id).toBe(createdComment.id);
    expect(updatedComment.likes).toBe(0);
  });

  it('should not be able to like or unlike a non existing comment', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    expect(
      updateLikes.execute({
        user_id: user.id,
        comment_id: 'wrong-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to like or unlike a non existing comment', async () => {
    expect(
      updateLikes.execute({
        user_id: 'wrong-id',
        comment_id: 'wrong-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';

import FakePostsRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';

import CreateCommentService from './CreateCommentService';

let fakeCommentsRepository: FakeCommentsRepository;
let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createComment: CreateCommentService;

describe('CreateComment', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createComment = new CreateCommentService(
      fakeCommentsRepository,
      fakePostsRepository,
      fakeUsersRepository
    );
  });

  it('should be able to create a comment', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content: 'This test is awesome!',
    });

    const createdComment = await createComment.execute({
      user_id: user.id,
      post_id: post.id,
      content: 'Yeah! Im sure it is.',
    });

    expect(createdComment).toHaveProperty('id');
    expect(createdComment.content).toBe('Yeah! Im sure it is.');
  });

  it('should not be able to create a comment with a non existing user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content: 'This test is awesome!',
    });

    expect(
      createComment.execute({
        user_id: 'non-existing-user',
        post_id: post.id,
        content: 'Yeah! Im sure it is.',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a comment with a non existing post', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    await fakePostsRepository.create({
      user_id: user.id,
      content: 'This test is awesome!',
    });

    expect(
      createComment.execute({
        user_id: user.id,
        post_id: 'non-existing-user',
        content: 'Yeah! Im sure it is.',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

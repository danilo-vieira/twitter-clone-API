import AppError from '@shared/errors/AppError';

import FakePostsRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';

import UpdateCommentService from './UpdateCommentService';

let fakeCommentsRepository: FakeCommentsRepository;
let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let updateComment: UpdateCommentService;

describe('UpdateComment', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    updateComment = new UpdateCommentService(
      fakeCommentsRepository,
      fakeUsersRepository
    );
  });

  it('should be able to update a comment', async () => {
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

    const updatedComment = await updateComment.execute({
      user_id: user.id,
      comment_id: createdComment.id,
      content: 'Edit: Im not sure it is :(',
    });

    expect(updatedComment.id).toBe(createdComment.id);
    expect(updatedComment.content).toBe('Edit: Im not sure it is :(');
  });

  it('should not be able to update a comment with a non existing user', async () => {
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

    expect(
      updateComment.execute({
        user_id: 'invalid-user-id',
        comment_id: createdComment.id,
        content: 'Edit: Im not sure it is :(',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a non existing comment', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    expect(
      updateComment.execute({
        user_id: user.id,
        comment_id: 'invalid-comment-id',
        content: 'Edit: Im not sure it is :(',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a comment that not belongs to the user', async () => {
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
      content: 'This test is awesome!',
    });

    const createdComment = await fakeCommentsRepository.create({
      user_id: userTwo.id,
      post_id: post.id,
      content: 'Yeah! Im sure it is.',
    });

    expect(
      updateComment.execute({
        user_id: userOne.id,
        comment_id: createdComment.id,
        content: 'Edit: Im not sure it is :(',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

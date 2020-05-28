import AppError from '@shared/errors/AppError';

import FakePostsRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';

import DeleteCommentService from './DeleteCommentService';

let fakeCommentsRepository: FakeCommentsRepository;
let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let deleteComment: DeleteCommentService;

describe('DeleteComment', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    deleteComment = new DeleteCommentService(
      fakeCommentsRepository,
      fakePostsRepository,
      fakeUsersRepository
    );
  });

  it('should be able to delete comment', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content: 'This test is awesome!',
    });

    const comment = await fakeCommentsRepository.create({
      user_id: user.id,
      post_id: post.id,
      content: 'Yeah! Im sure it is.',
    });

    await deleteComment.execute({
      user_id: user.id,
      comment_id: comment.id,
    });

    const commentFound = await fakeCommentsRepository.findById(comment.id);

    expect(commentFound).toBe(undefined);
  });

  it('should not be able to delete comment with a non existing user', async () => {
    expect(
      deleteComment.execute({
        user_id: 'invalid-user-id',
        comment_id: 'invalid-comment-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a non existing comment', async () => {
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
      deleteComment.execute({
        user_id: user.id,
        comment_id: 'invalid-comment-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to delete a comment that not belongs to the user's post but to the user", async () => {
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

    const comment = await fakeCommentsRepository.create({
      user_id: userTwo.id,
      post_id: post.id,
      content: 'Yeah! Im sure it is.',
    });

    await deleteComment.execute({
      user_id: userOne.id,
      comment_id: comment.id,
    });

    const commentFound = await fakeCommentsRepository.findById(comment.id);

    expect(commentFound).toBe(undefined);
  });

  it("should not be able to delete a comment that not belongs to the user's post even to the user", async () => {
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

    const userThree = await fakeUsersRepository.create({
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
      deleteComment.execute({
        user_id: userThree.id,
        comment_id: createdComment.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete comment from a non existing post', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const comment = await fakeCommentsRepository.create({
      user_id: user.id,
      post_id: 'invalid-post-id',
      content: 'Yeah! Im sure it is.',
    });

    expect(
      deleteComment.execute({
        user_id: user.id,
        comment_id: comment.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

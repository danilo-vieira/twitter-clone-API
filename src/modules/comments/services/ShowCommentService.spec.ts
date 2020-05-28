import AppError from '@shared/errors/AppError';

import FakePostsRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';

import ShowCommentService from './ShowCommentService';

let fakeCommentsRepository: FakeCommentsRepository;
let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let showComment: ShowCommentService;

describe('ShowComment', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    showComment = new ShowCommentService(
      fakeCommentsRepository,
      fakePostsRepository
    );
  });

  it('should be able to show one comment from post', async () => {
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

    const commentFound = await showComment.execute({
      post_id: post.id,
      comment_id: comment.id,
    });

    expect(commentFound.post_id).toBe(post.id);
  });

  it('should not be able to show one comment from a non existing post', async () => {
    expect(
      showComment.execute({
        post_id: 'invalid-post',
        comment_id: 'no-comments',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to show a non existing comment from post', async () => {
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
      showComment.execute({
        post_id: post.id,
        comment_id: 'no-comment',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to show one comment that not belongs to post', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const postOne = await fakePostsRepository.create({
      user_id: user.id,
      content: 'This test is awesome!',
    });

    const postTwo = await fakePostsRepository.create({
      user_id: user.id,
      content: 'This test is awesome!',
    });

    const comment = await fakeCommentsRepository.create({
      user_id: user.id,
      post_id: postTwo.id,
      content: 'Yeah! Im sure it is.',
    });

    expect(
      showComment.execute({
        post_id: postOne.id,
        comment_id: comment.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

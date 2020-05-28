import AppError from '@shared/errors/AppError';

import FakePostsRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';

import ListAllCommentsFromPostService from './ListAllCommentsFromPostService';

let fakeCommentsRepository: FakeCommentsRepository;
let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let listAllCommentsFromPost: ListAllCommentsFromPostService;

describe('ListAllCommentsFromPost', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listAllCommentsFromPost = new ListAllCommentsFromPostService(
      fakeCommentsRepository,
      fakePostsRepository
    );
  });

  it('should be able to list all comments from post', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content: 'This test is awesome!',
    });

    const commentOne = await fakeCommentsRepository.create({
      user_id: user.id,
      post_id: post.id,
      content: 'Yeah! Im sure it is.',
    });

    const commentTwo = await fakeCommentsRepository.create({
      user_id: user.id,
      post_id: post.id,
      content: 'Yeah! Im sure it is.',
    });

    const commentsFound = await listAllCommentsFromPost.execute(post.id);

    expect(commentsFound).toEqual([commentOne, commentTwo]);
  });

  it('should not be able to list all comments from a non existing post', async () => {
    expect(
      listAllCommentsFromPost.execute('wrong-post-id')
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

import UpdatePostService from './UpdatePostService';

let fakeUsersRepository: FakeUsersRepository;
let fakePostsRepository: FakePostsRepository;
let updatePost: UpdatePostService;

describe('UpdatePost', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    updatePost = new UpdatePostService(
      fakePostsRepository,
      fakeUsersRepository
    );
  });

  it('should be able to update a post', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'test-pass',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    });

    const updatedPost = await updatePost.execute({
      user_id: user.id,
      post_id: post.id,
      content: 'MODIFIED',
    });

    expect(updatedPost.id).toBe(post.id);
    expect(updatedPost.content).toBe('MODIFIED');
  });

  it('should not be able to update a post with invalid user id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'test-pass',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    });

    expect(
      updatePost.execute({
        user_id: 'invalid-id',
        post_id: post.id,
        content: 'MODIFIED',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a post that not exists', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'test-pass',
    });

    expect(
      updatePost.execute({
        user_id: user.id,
        post_id: 'invalid-id',
        content: 'MODIFIED',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a post of another user', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'John Doe - One',
      email: 'johndoe-One-@example.com',
      password: 'test-pass',
    });

    const userTwo = await fakeUsersRepository.create({
      name: 'John Doe - Two',
      email: 'johndoe-Two-@example.com',
      password: 'test-pass',
    });

    const postOne = await fakePostsRepository.create({
      user_id: userOne.id,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    });

    expect(
      updatePost.execute({
        user_id: userTwo.id,
        post_id: postOne.id,
        content: 'MODIFIED',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

import CreatePostService from './CreatePostService';

let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createPost: CreatePostService;

describe('CreatePost', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createPost = new CreatePostService(
      fakePostsRepository,
      fakeUsersRepository
    );
  });

  it('should be able to create a new post', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const post = await createPost.execute({
      user_id: user.id,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    });

    expect(post).toHaveProperty('id');
  });

  it('should not be able to create a new post with invalid user id', async () => {
    expect(
      createPost.execute({
        user_id: 'invalid-id',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

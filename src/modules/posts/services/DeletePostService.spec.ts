import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

import DeletePostService from './DeletePostService';

let fakeUsersRepository: FakeUsersRepository;
let fakePostsRepository: FakePostsRepository;
let deletePost: DeletePostService;

describe('ShowOnePostFromUser', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    deletePost = new DeletePostService(
      fakePostsRepository,
      fakeUsersRepository
    );
  });

  it('should be able to delete one post from user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    });

    await deletePost.execute({
      user_id: user.id,
      post_id: post.id,
    });

    const postFound = await fakePostsRepository.findOneById(post.id);

    expect(postFound).toBeUndefined();
  });

  it('should not be able to delete one post from a non existing user', async () => {
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
      deletePost.execute({
        user_id: 'non-existing-id',
        post_id: post.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a non existing post', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    expect(
      deletePost.execute({
        user_id: user.id,
        post_id: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a non existing post', async () => {
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
      deletePost.execute({
        user_id: userTwo.id,
        post_id: post.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

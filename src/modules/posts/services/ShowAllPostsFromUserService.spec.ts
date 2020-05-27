import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

import ShowAllPostsFromUserService from './ShowAllPostsFromUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakePostsRepository: FakePostsRepository;
let showAllPostsFromUser: ShowAllPostsFromUserService;

describe('ShowAllPostsFromUser', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    showAllPostsFromUser = new ShowAllPostsFromUserService(
      fakePostsRepository,
      fakeUsersRepository
    );
  });

  it('should be able to list all posts from user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const postOne = await fakePostsRepository.create({
      user_id: user.id,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    });

    const postTwo = await fakePostsRepository.create({
      user_id: user.id,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    });

    const posts = await showAllPostsFromUser.execute(user.id);

    expect(posts).toEqual([postOne, postTwo]);
  });

  it('should not be able to list posts from a non existing user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    await fakePostsRepository.create({
      user_id: user.id,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    });

    expect(
      showAllPostsFromUser.execute('non-existing-id')
    ).rejects.toBeInstanceOf(AppError);
  });
});

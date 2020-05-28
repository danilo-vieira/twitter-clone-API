import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

import ShowAllPostsService from './ShowAllPostsService';

let fakeUsersRepository: FakeUsersRepository;
let fakePostsRepository: FakePostsRepository;
let showAllPosts: ShowAllPostsService;

describe('ShowAllPosts', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    showAllPosts = new ShowAllPostsService(fakePostsRepository);
  });

  it('should be able to list all post from user', async () => {
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

    const postsFound = await showAllPosts.execute();

    expect(postsFound).toEqual([postOne, postTwo]);
  });
});

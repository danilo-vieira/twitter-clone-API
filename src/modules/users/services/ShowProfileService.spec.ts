import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able do show the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const userProfile = await showProfile.execute({
      user_id: user.id,
    });

    expect(userProfile.id).toEqual(user.id);
  });

  it('should not be able do show a non existing user profile', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

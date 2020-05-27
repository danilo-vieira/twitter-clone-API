import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import DeleteProfileService from './DeleteProfileService';

let fakeUsersRepository: FakeUsersRepository;
let deleteProfile: DeleteProfileService;

describe('DeleteProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteProfile = new DeleteProfileService(fakeUsersRepository);
  });

  it('should be able to delete an existing user account', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    await deleteProfile.execute({
      user_id: user.id,
    });

    const userFound = await fakeUsersRepository.findById(user.id);

    expect(userFound).toBe(undefined);
  });

  it('should not be able to delete a non existing user account', async () => {
    expect(
      deleteProfile.execute({
        user_id: 'wrong-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

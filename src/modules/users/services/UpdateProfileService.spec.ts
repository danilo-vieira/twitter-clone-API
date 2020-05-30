import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(fakeUsersRepository, hashProvider);
  });

  it('should be able to update user profile with new password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com',
      old_password: 'pass-test',
      password: 'new-pass',
    });

    expect(updatedUser.password).toBe('new-pass');
  });

  it('should be able to update user profile without new password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John',
      email: 'johndoe@example.com',
    });

    expect(updatedUser.name).toBe('John');
  });

  it('should not be able to update user profile containing old password without new password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        old_password: 'pass-test',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a non existing user profile', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: 'John Doe',
        email: 'johndoe@example.com',
        old_password: 'pass-test',
        password: 'new-pass',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user profile with email used by other user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe - 1',
      email: 'johndoe-1@example.com',
      password: 'pass-test',
    });

    await fakeUsersRepository.create({
      name: 'John Doe - 2',
      email: 'johndoe-2@example.com',
      password: 'pass-test',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe - 1',
        email: 'johndoe-2@example.com',
        old_password: 'pass-test',
        password: 'new-pass',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'new-pass',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass-test',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        old_password: 'wrong-pass',
        password: 'new-pass',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

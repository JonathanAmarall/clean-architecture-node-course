import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hash'));
  },
}));

describe('Bcrypt Adapter', () => {
  test('should call Bcrypt wih correct values', async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const haskSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');

    expect(haskSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('should return hash on success', async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hash');
  });
});

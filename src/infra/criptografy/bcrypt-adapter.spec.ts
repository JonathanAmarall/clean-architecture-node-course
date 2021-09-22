import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hash'));
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(salt);
  return sut;
};

describe('Bcrypt Adapter', () => {
  test('should call Bcrypt wih correct values', async () => {
    const sut = makeSut();
    const haskSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');

    expect(haskSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('should return hash on success', async () => {
    const sut = makeSut();
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hash');
  });
});

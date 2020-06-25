import randomBytes from '../randomBytes';

describe('random bytes', () => {
  it('should generate default length', async () => {
    const result = randomBytes();
    expect(result).toHaveLength(48);
  });

  it('should generate custom length', async () => {
    const result = randomBytes(69);

    expect(result).toHaveLength(69);
  });
});

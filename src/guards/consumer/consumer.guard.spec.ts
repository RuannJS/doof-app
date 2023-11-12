import { ConsumerGuard } from './consumer.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new ConsumerGuard()).toBeDefined();
  });
});

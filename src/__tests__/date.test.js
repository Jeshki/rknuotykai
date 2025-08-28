import { isPastEvent } from '../lib/date';

describe('isPastEvent', () => {
  test('returns true for past dates', () => {
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    expect(isPastEvent(pastDate)).toBe(true);
  });

  test('returns false for future dates', () => {
    const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    expect(isPastEvent(futureDate)).toBe(false);
  });

  test('returns true when date is missing', () => {
    expect(isPastEvent()).toBe(true);
  });
});


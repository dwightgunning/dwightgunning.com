import { describe, it, expect, vi, afterEach } from 'vitest';
import toLocalTzISOString from './toLocalTzISOString';

afterEach(() => {
  vi.restoreAllMocks();
});

function withOffset(offsetMinutes: number) {
  vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(offsetMinutes);
}

describe('toLocalTzISOString', () => {
  it('returns correct date string in UTC (zero offset)', () => {
    withOffset(0);
    expect(toLocalTzISOString(new Date('2023-06-15T12:00:00Z'))).toBe('2023-06-15');
  });

  it('returns next calendar day for UTC+2 when time is near midnight UTC', () => {
    // UTC+2 means offset = -120
    withOffset(-120);
    // 11pm UTC is 1am the next day in UTC+2
    expect(toLocalTzISOString(new Date('2023-06-15T23:00:00Z'))).toBe('2023-06-16');
  });

  it('returns previous calendar day for UTC-8 when time is early morning UTC', () => {
    // UTC-8 means offset = +480
    withOffset(480);
    // 1am UTC is 5pm the previous day in UTC-8
    expect(toLocalTzISOString(new Date('2023-06-15T01:00:00Z'))).toBe('2023-06-14');
  });

  it('output matches YYYY-MM-DD format', () => {
    withOffset(0);
    const result = toLocalTzISOString(new Date('2023-06-15T00:00:00Z'));
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('handles month boundary (Jan 31 → Feb 1) at positive offset', () => {
    // UTC+2: Jan 31 23:00 UTC → Feb 1 01:00 local
    withOffset(-120);
    expect(toLocalTzISOString(new Date('2023-01-31T23:30:00Z'))).toBe('2023-02-01');
  });

  it('handles year boundary (Dec 31 → Jan 1) at positive offset', () => {
    // UTC+2: Dec 31 23:00 UTC → Jan 1 01:00 local
    withOffset(-120);
    expect(toLocalTzISOString(new Date('2022-12-31T23:30:00Z'))).toBe('2023-01-01');
  });

  it('handles month boundary (Feb 1 → Jan 31) at negative offset', () => {
    // UTC-8: Feb 1 01:00 UTC → Jan 31 17:00 local
    withOffset(480);
    expect(toLocalTzISOString(new Date('2023-02-01T01:00:00Z'))).toBe('2023-01-31');
  });
});

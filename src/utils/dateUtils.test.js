import { formatRelativeTime, formatShortRelativeTime } from './dateUtils';

describe('dateUtils', () => {
  describe('formatRelativeTime', () => {
    it('should format a date to relative time with "ago" suffix', () => {
      const pastDate = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
      const result = formatRelativeTime(pastDate);
      expect(result).toContain('ago');
    });

    it('should handle invalid dates gracefully', () => {
      const result = formatRelativeTime('invalid-date');
      expect(result).toBe('recently');
    });

    it('should accept custom options', () => {
      const pastDate = new Date(Date.now() - 60 * 60 * 1000);
      const result = formatRelativeTime(pastDate, { addSuffix: false });
      expect(result).not.toContain('ago');
    });
  });

  describe('formatShortRelativeTime', () => {
    it('should format very recent timestamps as "Just now"', () => {
      const now = new Date();
      const result = formatShortRelativeTime(now);
      expect(result).toBe('Just now');
    });

    it('should format minutes correctly', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const result = formatShortRelativeTime(fiveMinutesAgo);
      expect(result).toBe('5m ago');
    });

    it('should format hours correctly', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      const result = formatShortRelativeTime(twoHoursAgo);
      expect(result).toBe('2h ago');
    });

    it('should format days correctly', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      const result = formatShortRelativeTime(threeDaysAgo);
      expect(result).toBe('3d ago');
    });

    it('should format older dates as short date string', () => {
      const eightDaysAgo = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
      const result = formatShortRelativeTime(eightDaysAgo);
      expect(result).toMatch(/[A-Za-z]{3} \d{1,2}/); // e.g., "Jan 15"
    });
  });
});

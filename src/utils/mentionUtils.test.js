import { findMentionStart, extractMentionQuery, filterUsersForMention } from './mentionUtils';

describe('mentionUtils', () => {
  describe('findMentionStart', () => {
    it('should find @ symbol before cursor', () => {
      const text = 'Hello @user';
      const cursor = 11;
      expect(findMentionStart(text, cursor)).toBe(6);
    });

    it('should return -1 if no @ found', () => {
      const text = 'Hello user';
      const cursor = 10;
      expect(findMentionStart(text, cursor)).toBe(-1);
    });

    it('should return -1 if space before @', () => {
      const text = 'Hello user @name';
      const cursor = 11;
      expect(findMentionStart(text, cursor)).toBe(-1);
    });
  });

  describe('extractMentionQuery', () => {
    it('should extract query after @', () => {
      const text = 'Hello @john';
      const atIndex = 6;
      const cursor = 11;
      expect(extractMentionQuery(text, atIndex, cursor)).toBe('john');
    });

    it('should return empty string if cursor right after @', () => {
      const text = 'Hello @';
      const atIndex = 6;
      const cursor = 7;
      expect(extractMentionQuery(text, atIndex, cursor)).toBe('');
    });
  });

  describe('filterUsersForMention', () => {
    const users = [
      { name: 'John Doe', username: 'johndoe' },
      { name: 'Jane Smith', username: 'janesmith' },
      { name: 'Bob Johnson', username: 'bjohnson' }
    ];

    it('should filter by name', () => {
      const result = filterUsersForMention(users, 'john');
      expect(result).toHaveLength(2);
      expect(result.map(u => u.username)).toContain('johndoe');
      expect(result.map(u => u.username)).toContain('bjohnson');
    });

    it('should filter by username', () => {
      const result = filterUsersForMention(users, 'jane');
      expect(result).toHaveLength(1);
      expect(result[0].username).toBe('janesmith');
    });

    it('should return all users for empty query', () => {
      const result = filterUsersForMention(users, '');
      expect(result).toHaveLength(3);
    });

    it('should be case insensitive', () => {
      const result = filterUsersForMention(users, 'JOHN');
      expect(result).toHaveLength(2);
    });
  });
});

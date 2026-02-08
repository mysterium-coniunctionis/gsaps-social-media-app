import {
  detectContentIssues,
  getBlocklist,
  saveBlocklist,
  hasAcceptedGuidelines,
  acceptGuidelines,
  getAuditLog,
  recordAuditEvent
} from './moderation';

// Mock the moderation data
jest.mock('../data/moderation/moderationData', () => ({
  communityGuidelines: { version: '1.0' },
  defaultAuditLog: [
    { id: 'L-1', actor: 'system', event: 'init', detail: '', timestamp: '2024-01-01T00:00:00.000Z' }
  ],
  defaultBlocklist: {
    spam: ['buy now', 'click here'],
    pii: ['ssn', 'social security']
  }
}));

describe('moderation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getBlocklist', () => {
    it('returns default blocklist when nothing is stored', () => {
      const blocklist = getBlocklist();
      expect(blocklist).toHaveProperty('spam');
      expect(blocklist).toHaveProperty('pii');
    });

    it('returns stored blocklist when available', () => {
      const customBlocklist = { custom: ['bad-word'] };
      localStorage.setItem('gsaps_blocklist', JSON.stringify(customBlocklist));

      const blocklist = getBlocklist();
      expect(blocklist).toEqual(customBlocklist);
    });

    it('falls back to default on malformed JSON', () => {
      localStorage.setItem('gsaps_blocklist', 'not json');
      const blocklist = getBlocklist();
      expect(blocklist).toHaveProperty('spam');
    });
  });

  describe('saveBlocklist', () => {
    it('persists blocklist to localStorage', () => {
      const customBlocklist = { custom: ['term1'] };
      saveBlocklist(customBlocklist);

      const stored = JSON.parse(localStorage.getItem('gsaps_blocklist'));
      expect(stored).toEqual(customBlocklist);
    });

    it('returns the blocklist', () => {
      const customBlocklist = { custom: ['term1'] };
      const result = saveBlocklist(customBlocklist);
      expect(result).toEqual(customBlocklist);
    });
  });

  describe('hasAcceptedGuidelines', () => {
    it('returns false when no acceptance is stored', () => {
      expect(hasAcceptedGuidelines()).toBe(false);
    });

    it('returns truthy when current version is accepted', () => {
      const acceptance = { version: '1.0', acceptedAt: new Date().toISOString() };
      localStorage.setItem('gsaps_guidelines_acceptance', JSON.stringify(acceptance));

      expect(hasAcceptedGuidelines('1.0')).toBeTruthy();
    });

    it('returns falsy when different version was accepted', () => {
      const acceptance = { version: '0.9', acceptedAt: new Date().toISOString() };
      localStorage.setItem('gsaps_guidelines_acceptance', JSON.stringify(acceptance));

      expect(hasAcceptedGuidelines('1.0')).toBeFalsy();
    });

    it('returns falsy when acceptedAt is missing', () => {
      const acceptance = { version: '1.0' };
      localStorage.setItem('gsaps_guidelines_acceptance', JSON.stringify(acceptance));

      expect(hasAcceptedGuidelines('1.0')).toBeFalsy();
    });
  });

  describe('acceptGuidelines', () => {
    it('stores acceptance with version and timestamp', () => {
      const result = acceptGuidelines('1.0');

      expect(result.version).toBe('1.0');
      expect(result.acceptedAt).toBeDefined();
    });

    it('persists to localStorage', () => {
      acceptGuidelines('1.0');

      const stored = JSON.parse(localStorage.getItem('gsaps_guidelines_acceptance'));
      expect(stored.version).toBe('1.0');
      expect(stored.acceptedAt).toBeDefined();
    });

    it('uses default version from community guidelines', () => {
      const result = acceptGuidelines();
      expect(result.version).toBe('1.0');
    });
  });

  describe('getAuditLog', () => {
    it('returns default audit log when nothing is stored', () => {
      const log = getAuditLog();
      expect(Array.isArray(log)).toBe(true);
      expect(log.length).toBe(1);
      expect(log[0].event).toBe('init');
    });

    it('returns stored audit log when available', () => {
      const customLog = [{ id: 'L-2', actor: 'admin', event: 'ban', detail: '', timestamp: '2024-06-01' }];
      localStorage.setItem('gsaps_audit_log', JSON.stringify(customLog));

      const log = getAuditLog();
      expect(log).toEqual(customLog);
    });
  });

  describe('recordAuditEvent', () => {
    it('returns entry with generated id, actor, event, detail, and timestamp', () => {
      const entry = recordAuditEvent('user_warned', 'admin-1', 'Warned for spam');

      expect(entry.id).toMatch(/^L-\d+$/);
      expect(entry.actor).toBe('admin-1');
      expect(entry.event).toBe('user_warned');
      expect(entry.detail).toBe('Warned for spam');
      expect(entry.timestamp).toBeDefined();
    });

    it('prepends new entry to existing audit log', () => {
      recordAuditEvent('event1', 'admin', 'detail1');
      recordAuditEvent('event2', 'admin', 'detail2');

      const log = getAuditLog();
      expect(log[0].event).toBe('event2');
      expect(log[1].event).toBe('event1');
    });

    it('limits audit log to 50 entries', () => {
      for (let i = 0; i < 55; i++) {
        recordAuditEvent(`event-${i}`, 'system', '');
      }

      const log = getAuditLog();
      expect(log.length).toBeLessThanOrEqual(50);
    });

    it('defaults actor to system', () => {
      const entry = recordAuditEvent('test_event');
      expect(entry.actor).toBe('system');
    });
  });

  describe('detectContentIssues', () => {
    it('returns allow for clean content', () => {
      const result = detectContentIssues('This is a normal post about research');
      expect(result.recommendedAction).toBe('allow');
      expect(result.findings).toHaveLength(0);
    });

    it('detects blocklisted spam terms', () => {
      const result = detectContentIssues('Buy now! Great deal!');
      expect(result.findings.length).toBeGreaterThan(0);
      expect(result.findings[0].type).toBe('blocklist');
      expect(result.findings[0].category).toBe('spam');
    });

    it('detects blocklisted PII terms with critical severity', () => {
      const result = detectContentIssues('Please provide your ssn');
      const piiFinding = result.findings.find(f => f.category === 'pii');
      expect(piiFinding).toBeDefined();
      expect(piiFinding.severity).toBe('critical');
    });

    it('returns quarantine action for critical findings', () => {
      const result = detectContentIssues('My ssn is here');
      expect(result.recommendedAction).toBe('quarantine');
    });

    it('returns review action for non-critical findings', () => {
      const result = detectContentIssues('Buy now and get a discount');
      expect(result.recommendedAction).toBe('review');
    });

    it('detects email addresses as PII', () => {
      const result = detectContentIssues('Contact me at user@example.com');
      const piiFinding = result.findings.find(f => f.type === 'pii');
      expect(piiFinding).toBeDefined();
      expect(piiFinding.severity).toBe('critical');
      expect(piiFinding.term).toBe('user@example.com');
    });

    it('detects phone numbers as PII', () => {
      const result = detectContentIssues('Call me at 555-123-4567');
      const piiFinding = result.findings.find(f => f.type === 'pii');
      expect(piiFinding).toBeDefined();
      expect(piiFinding.severity).toBe('critical');
    });

    it('detects phone numbers with country code', () => {
      const result = detectContentIssues('Reach me at +1 555-123-4567');
      const piiFinding = result.findings.find(f => f.type === 'pii');
      expect(piiFinding).toBeDefined();
    });

    it('is case-insensitive for blocklist matching', () => {
      const result = detectContentIssues('BUY NOW for great deals');
      expect(result.findings.length).toBeGreaterThan(0);
    });

    it('accepts a custom blocklist', () => {
      const customBlocklist = { custom: ['forbidden-word'] };
      const result = detectContentIssues('This contains forbidden-word', customBlocklist);
      expect(result.findings.length).toBeGreaterThan(0);
      expect(result.findings[0].category).toBe('custom');
    });

    it('handles empty content', () => {
      const result = detectContentIssues('');
      expect(result.recommendedAction).toBe('allow');
      expect(result.findings).toHaveLength(0);
    });
  });
});

import {
  getBlocklist,
  saveBlocklist,
  hasAcceptedGuidelines,
  acceptGuidelines,
  getAuditLog,
  recordAuditEvent,
  detectContentIssues
} from './moderation';
import { defaultBlocklist, communityGuidelines, defaultAuditLog } from '../data/moderation/moderationData';

describe('moderation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getBlocklist', () => {
    it('should return default blocklist when nothing is stored', () => {
      const blocklist = getBlocklist();
      expect(blocklist).toEqual(defaultBlocklist);
    });

    it('should return stored blocklist when available', () => {
      const custom = { toxicity: ['custom-bad-word'], pii: [] };
      localStorage.setItem('gsaps_blocklist', JSON.stringify(custom));
      const blocklist = getBlocklist();
      expect(blocklist).toEqual(custom);
    });

    it('should return default blocklist on parse error', () => {
      localStorage.setItem('gsaps_blocklist', 'invalid-json');
      const blocklist = getBlocklist();
      expect(blocklist).toEqual(defaultBlocklist);
    });
  });

  describe('saveBlocklist', () => {
    it('should save blocklist to localStorage and return it', () => {
      const custom = { toxicity: ['new-term'], pii: ['credit card'] };
      const result = saveBlocklist(custom);
      expect(result).toEqual(custom);

      const stored = JSON.parse(localStorage.getItem('gsaps_blocklist'));
      expect(stored).toEqual(custom);
    });
  });

  describe('hasAcceptedGuidelines', () => {
    it('should return false when no acceptance is stored', () => {
      expect(hasAcceptedGuidelines()).toBe(false);
    });

    it('should return truthy when correct version was accepted', () => {
      const acceptance = {
        version: communityGuidelines.version,
        acceptedAt: new Date().toISOString()
      };
      localStorage.setItem('gsaps_guidelines_acceptance', JSON.stringify(acceptance));
      expect(hasAcceptedGuidelines()).toBeTruthy();
    });

    it('should return falsy when a different version was accepted', () => {
      const acceptance = {
        version: '1999.1',
        acceptedAt: new Date().toISOString()
      };
      localStorage.setItem('gsaps_guidelines_acceptance', JSON.stringify(acceptance));
      expect(hasAcceptedGuidelines()).toBeFalsy();
    });

    it('should return falsy when acceptedAt is missing', () => {
      const acceptance = { version: communityGuidelines.version };
      localStorage.setItem('gsaps_guidelines_acceptance', JSON.stringify(acceptance));
      expect(hasAcceptedGuidelines()).toBeFalsy();
    });
  });

  describe('acceptGuidelines', () => {
    it('should store acceptance with current version and timestamp', () => {
      const result = acceptGuidelines();
      expect(result.version).toBe(communityGuidelines.version);
      expect(result.acceptedAt).toBeDefined();

      const stored = JSON.parse(localStorage.getItem('gsaps_guidelines_acceptance'));
      expect(stored.version).toBe(communityGuidelines.version);
    });

    it('should accept a custom version', () => {
      const result = acceptGuidelines('3.0.0');
      expect(result.version).toBe('3.0.0');
    });
  });

  describe('getAuditLog', () => {
    it('should return default audit log when nothing is stored', () => {
      const log = getAuditLog();
      expect(log).toEqual(defaultAuditLog);
    });

    it('should return stored audit log when available', () => {
      const custom = [{ id: 'L-999', actor: 'test', event: 'test', detail: '', timestamp: new Date().toISOString() }];
      localStorage.setItem('gsaps_audit_log', JSON.stringify(custom));
      const log = getAuditLog();
      expect(log).toEqual(custom);
    });
  });

  describe('recordAuditEvent', () => {
    it('should create an audit entry and prepend to log', () => {
      const entry = recordAuditEvent('Test event', 'test_actor', 'test details');
      expect(entry.event).toBe('Test event');
      expect(entry.actor).toBe('test_actor');
      expect(entry.detail).toBe('test details');
      expect(entry.id).toMatch(/^L-\d+$/);
      expect(entry.timestamp).toBeDefined();
    });

    it('should limit audit log to 50 entries', () => {
      // Fill up with 50 entries
      for (let i = 0; i < 55; i++) {
        recordAuditEvent(`Event ${i}`);
      }
      const log = getAuditLog();
      expect(log.length).toBeLessThanOrEqual(50);
    });

    it('should use system as default actor', () => {
      const entry = recordAuditEvent('Auto event');
      expect(entry.actor).toBe('system');
    });
  });

  describe('detectContentIssues', () => {
    it('should return allow for clean content', () => {
      const result = detectContentIssues('This is a perfectly normal research discussion.');
      expect(result.recommendedAction).toBe('allow');
      expect(result.findings.length).toBe(0);
    });

    it('should detect blocklisted toxicity terms', () => {
      const result = detectContentIssues('This contains hate speech and is terrible');
      expect(result.findings.length).toBeGreaterThan(0);
      expect(result.findings.some(f => f.category === 'toxicity')).toBe(true);
    });

    it('should detect PII blocklist terms with critical severity', () => {
      const result = detectContentIssues('Here is my ssn number');
      const piiFinding = result.findings.find(f => f.category === 'pii');
      expect(piiFinding).toBeDefined();
      expect(piiFinding.severity).toBe('critical');
    });

    it('should detect email addresses as PII', () => {
      const result = detectContentIssues('Contact me at user@example.com for details');
      const piiFinding = result.findings.find(f => f.type === 'pii');
      expect(piiFinding).toBeDefined();
      expect(piiFinding.term).toBe('user@example.com');
      expect(piiFinding.severity).toBe('critical');
    });

    it('should detect phone numbers as PII', () => {
      const result = detectContentIssues('Call me at 555-123-4567');
      const piiFinding = result.findings.find(f => f.type === 'pii');
      expect(piiFinding).toBeDefined();
      expect(piiFinding.severity).toBe('critical');
    });

    it('should recommend quarantine for critical findings', () => {
      const result = detectContentIssues('My ssn is 123-45-6789 and email is test@test.com');
      expect(result.recommendedAction).toBe('quarantine');
    });

    it('should recommend review for non-critical blocklist hits', () => {
      const result = detectContentIssues('This contains hate speech');
      expect(result.recommendedAction).toBe('review');
    });

    it('should detect medical misinformation terms', () => {
      const result = detectContentIssues('This is a miracle cure for depression');
      expect(result.findings.some(f => f.category === 'medical')).toBe(true);
    });

    it('should be case-insensitive', () => {
      const result = detectContentIssues('HATE SPEECH is not allowed');
      expect(result.findings.some(f => f.category === 'toxicity')).toBe(true);
    });

    it('should accept a custom blocklist', () => {
      const customBlocklist = { custom: ['forbidden-word'] };
      const result = detectContentIssues('This has a forbidden-word in it', customBlocklist);
      expect(result.findings.length).toBeGreaterThan(0);
      expect(result.findings[0].category).toBe('custom');
    });
  });
});

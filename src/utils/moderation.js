import {
  communityGuidelines,
  defaultAuditLog,
  defaultBlocklist
} from '../data/moderation/moderationData';

const isBrowser = typeof window !== 'undefined';
const BLOCKLIST_KEY = 'gsaps_blocklist';
const GUIDELINES_KEY = 'gsaps_guidelines_acceptance';
const AUDIT_LOG_KEY = 'gsaps_audit_log';

const safelyParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn('Failed to parse moderation data', error);
    return fallback;
  }
};

export const getBlocklist = () => {
  if (!isBrowser) {
    return defaultBlocklist;
  }

  const stored = safelyParse(localStorage.getItem(BLOCKLIST_KEY), null);
  return stored || defaultBlocklist;
};

export const saveBlocklist = (blocklist) => {
  if (isBrowser) {
    localStorage.setItem(BLOCKLIST_KEY, JSON.stringify(blocklist));
  }
  return blocklist;
};

export const hasAcceptedGuidelines = (version = communityGuidelines.version) => {
  if (!isBrowser) {
    return false;
  }

  const acceptance = safelyParse(localStorage.getItem(GUIDELINES_KEY), {});
  return acceptance.version === version && acceptance.acceptedAt;
};

export const acceptGuidelines = (version = communityGuidelines.version) => {
  const payload = {
    version,
    acceptedAt: new Date().toISOString()
  };

  if (isBrowser) {
    localStorage.setItem(GUIDELINES_KEY, JSON.stringify(payload));
  }

  return payload;
};

export const getAuditLog = () => {
  if (!isBrowser) {
    return defaultAuditLog;
  }

  const stored = safelyParse(localStorage.getItem(AUDIT_LOG_KEY), null);
  return stored || defaultAuditLog;
};

export const recordAuditEvent = (event, actor = 'system', detail = '') => {
  const entry = {
    id: `L-${Date.now()}`,
    actor,
    event,
    detail,
    timestamp: new Date().toISOString()
  };

  const existing = getAuditLog();
  const updated = [entry, ...existing].slice(0, 50);

  if (isBrowser) {
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(updated));
  }

  return entry;
};

const phoneRegex = /(?:\+?\d{1,2}[\s-]?)?(?:\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}/g;
const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

export const detectContentIssues = (content, blocklist = getBlocklist()) => {
  const lower = content.toLowerCase();
  const findings = [];

  const blocklistEntries = Object.entries(blocklist);
  blocklistEntries.forEach(([category, terms]) => {
    terms.forEach((term) => {
      if (lower.includes(term.toLowerCase())) {
        findings.push({
          type: 'blocklist',
          category,
          term,
          severity: category === 'pii' ? 'critical' : 'high',
          message: `Blocklisted term detected in ${category}`
        });
      }
    });
  });

  const piiMatches = [
    ...(content.match(emailRegex) || []),
    ...(content.match(phoneRegex) || [])
  ];

  if (piiMatches.length > 0) {
    piiMatches.forEach((match) => {
      findings.push({
        type: 'pii',
        severity: 'critical',
        term: match,
        message: 'Potential PII detected'
      });
    });
  }

  const highRisk = findings.some((item) => item.severity === 'critical');
  const recommendedAction = highRisk ? 'quarantine' : findings.length > 0 ? 'review' : 'allow';

  return {
    findings,
    recommendedAction
  };
};

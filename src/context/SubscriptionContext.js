import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import subscriptionPlans from '../data/subscriptionPlans';

const SubscriptionContext = createContext();

const defaultOrg = {
  name: 'Global Psychedelic Institute',
  type: 'institutional',
  tier: 'institutional-enterprise',
  seats: 50,
  seatsUsed: 38,
  autoIssueCertificates: true,
  billingEmail: 'billing@globalpsychedelic.org'
};

const defaultLicenses = [
  {
    id: 'license-clinical',
    label: 'Clinical Therapy Bundle',
    scope: ['psychedelic-therapy', 'integration', 'ethics'],
    ceIncluded: true,
    seats: 40,
    seatsUsed: 26,
    expiresAt: '2025-12-31'
  },
  {
    id: 'license-research',
    label: 'Research & Neuroscience',
    scope: ['neuroscience', 'clinical-research'],
    ceIncluded: true,
    seats: 25,
    seatsUsed: 18,
    expiresAt: '2025-08-01'
  },
  {
    id: 'license-individual',
    label: 'Individual Premium',
    scope: 'all',
    ceIncluded: true,
    seats: 1,
    seatsUsed: 1,
    expiresAt: '2025-03-15'
  }
];

const defaultInvoices = [
  {
    id: 'inv-2024-11',
    period: 'Nov 2024',
    amount: '$2,450.00',
    status: 'Paid',
    seats: 50,
    issuedAt: '2024-11-01',
    dueAt: '2024-11-30'
  },
  {
    id: 'inv-2024-12',
    period: 'Dec 2024',
    amount: '$2,450.00',
    status: 'Paid',
    seats: 50,
    issuedAt: '2024-12-01',
    dueAt: '2024-12-31'
  },
  {
    id: 'inv-2025-01',
    period: 'Jan 2025',
    amount: '$2,750.00',
    status: 'Open',
    seats: 60,
    issuedAt: '2025-01-01',
    dueAt: '2025-01-31'
  }
];

const SubscriptionProvider = ({ children }) => {
  const [organization, setOrganization] = useState(defaultOrg);
  const [licenses, setLicenses] = useState(defaultLicenses);
  const [invoices, setInvoices] = useState(defaultInvoices);
  const [credentials, setCredentials] = useState([]);

  const activePlan = useMemo(
    () => subscriptionPlans.find(plan => plan.id === organization.tier) || subscriptionPlans[0],
    [organization.tier]
  );

  const getAccessStatus = useCallback((course) => {
    if (!course) return { allowed: true };

    const license = licenses.find(l =>
      l.scope === 'all' || l.scope.includes(course.category) || l.scope.includes(course.level)
    );

    if (!license) {
      return {
        allowed: false,
        reason: 'No license covers this course category yet.',
        license: null
      };
    }

    if (license.seatsUsed >= license.seats) {
      return {
        allowed: false,
        reason: 'All licensed seats are in use. Please free a seat or upgrade.',
        license
      };
    }

    if (course.ceCredits > 0 && !license.ceIncluded) {
      return {
        allowed: false,
        reason: 'This course includes CE credits but your license does not cover CE.',
        license
      };
    }

    return {
      allowed: true,
      license,
      ceEligible: course.ceCredits > 0,
      seatsRemaining: license.seats - license.seatsUsed
    };
  }, [licenses]);

  const registerEnrollment = (course) => {
    setLicenses(prev =>
      prev.map(license => {
        if (
          (license.scope === 'all' || license.scope.includes(course.category) || license.scope.includes(course.level)) &&
          license.seatsUsed < license.seats
        ) {
          return { ...license, seatsUsed: license.seatsUsed + 1 };
        }
        return license;
      })
    );

    setOrganization(prev => ({ ...prev, seatsUsed: Math.min(prev.seatsUsed + 1, prev.seats) }));
  };

  const releaseSeat = (course) => {
    setLicenses(prev =>
      prev.map(license => {
        if (license.scope === 'all' || license.scope.includes(course.category) || license.scope.includes(course.level)) {
          return { ...license, seatsUsed: Math.max(license.seatsUsed - 1, 0) };
        }
        return license;
      })
    );

    setOrganization(prev => ({ ...prev, seatsUsed: Math.max(prev.seatsUsed - 1, 0) }));
  };

  const issueVerifiableCredential = ({ course, user, completionDate, score }) => {
    const credential = {
      id: `cred-${course?.id || 'course'}-${Date.now()}`,
      courseId: course?.id,
      courseTitle: course?.title,
      issuedTo: user?.email || user?.username || 'member',
      issuedAt: completionDate || new Date().toISOString(),
      ceCredits: course?.ceCredits,
      score,
      verificationUrl: `https://verify.gsaps.org/credentials/${course?.id || 'course'}/${Date.now()}`
    };

    setCredentials(prev => [credential, ...prev].slice(0, 20));
    return credential;
  };

  const value = {
    plans: subscriptionPlans,
    organization,
    licenses,
    invoices,
    credentials,
    activePlan,
    setOrganization,
    setLicenses,
    getAccessStatus,
    registerEnrollment,
    releaseSeat,
    issueVerifiableCredential
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

const useSubscription = () => useContext(SubscriptionContext);

export { SubscriptionProvider, useSubscription };

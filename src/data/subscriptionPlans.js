const subscriptionPlans = [
  {
    id: 'individual-basic',
    name: 'Individual',
    label: 'Individual (Basic)',
    price: '$29/mo',
    billingProvider: 'Stripe',
    seats: 1,
    features: [
      'Single seat with CE eligibility',
      'Access to 3 active courses',
      'Downloadable certificates',
      'Basic CE tracker'
    ]
  },
  {
    id: 'individual-premium',
    name: 'Individual Premium',
    label: 'Individual (Premium)',
    price: '$59/mo',
    billingProvider: 'Stripe',
    seats: 1,
    features: [
      'Unlimited course enrollments',
      'CE tracker exports (PDF/CSV)',
      'Priority support',
      'Verifiable credential issuance'
    ]
  },
  {
    id: 'institutional-standard',
    name: 'Institutional',
    label: 'Institutional (Standard)',
    price: '$1,250/mo',
    billingProvider: 'Stripe',
    seats: 25,
    features: [
      'Seat management with approvals',
      'License-based course access',
      'Invoice history + receipts',
      'Basic org reporting'
    ]
  },
  {
    id: 'institutional-enterprise',
    name: 'Enterprise',
    label: 'Institutional (Enterprise)',
    price: 'Custom',
    billingProvider: 'Stripe',
    seats: 50,
    features: [
      'Dedicated CSM + SSO',
      'Advanced reporting + exports',
      'Automated credential issuance',
      'Multi-license governance'
    ]
  }
];

export default subscriptionPlans;

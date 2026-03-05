import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SubscriptionProvider, useSubscription } from './SubscriptionContext';

const TestConsumer = ({ courseForAccess, courseForEnroll, courseForRelease }) => {
  const {
    plans,
    organization,
    licenses,
    invoices,
    credentials,
    activePlan,
    getAccessStatus,
    registerEnrollment,
    releaseSeat,
    issueVerifiableCredential
  } = useSubscription();

  const accessStatus = courseForAccess ? getAccessStatus(courseForAccess) : null;

  return (
    <div>
      <span data-testid="org-name">{organization.name}</span>
      <span data-testid="org-tier">{organization.tier}</span>
      <span data-testid="org-seats">{organization.seats}</span>
      <span data-testid="org-seats-used">{organization.seatsUsed}</span>
      <span data-testid="plan-count">{plans.length}</span>
      <span data-testid="active-plan">{activePlan.name}</span>
      <span data-testid="license-count">{licenses.length}</span>
      <span data-testid="invoice-count">{invoices.length}</span>
      <span data-testid="credential-count">{credentials.length}</span>

      {accessStatus && (
        <div>
          <span data-testid="access-allowed">{String(accessStatus.allowed)}</span>
          {accessStatus.reason && <span data-testid="access-reason">{accessStatus.reason}</span>}
          {accessStatus.seatsRemaining !== undefined && (
            <span data-testid="seats-remaining">{accessStatus.seatsRemaining}</span>
          )}
        </div>
      )}

      {courseForEnroll && (
        <button onClick={() => registerEnrollment(courseForEnroll)}>enroll</button>
      )}
      {courseForRelease && (
        <button onClick={() => releaseSeat(courseForRelease)}>release</button>
      )}
      <button onClick={() => issueVerifiableCredential({
        course: { id: 'c1', title: 'Test Course', ceCredits: 5 },
        user: { email: 'test@example.com' },
        score: 95
      })}>issue-credential</button>
    </div>
  );
};

describe('SubscriptionContext', () => {
  describe('default state', () => {
    it('should provide default organization data', () => {
      render(
        <SubscriptionProvider>
          <TestConsumer />
        </SubscriptionProvider>
      );

      expect(screen.getByTestId('org-name')).toHaveTextContent('Global Psychedelic Institute');
      expect(screen.getByTestId('org-tier')).toHaveTextContent('institutional-enterprise');
      expect(screen.getByTestId('org-seats')).toHaveTextContent('50');
    });

    it('should provide subscription plans', () => {
      render(
        <SubscriptionProvider>
          <TestConsumer />
        </SubscriptionProvider>
      );

      expect(Number(screen.getByTestId('plan-count').textContent)).toBe(4);
    });

    it('should match active plan to organization tier', () => {
      render(
        <SubscriptionProvider>
          <TestConsumer />
        </SubscriptionProvider>
      );

      expect(screen.getByTestId('active-plan')).toHaveTextContent('Enterprise');
    });

    it('should provide default licenses', () => {
      render(
        <SubscriptionProvider>
          <TestConsumer />
        </SubscriptionProvider>
      );

      expect(Number(screen.getByTestId('license-count').textContent)).toBe(3);
    });

    it('should provide default invoices', () => {
      render(
        <SubscriptionProvider>
          <TestConsumer />
        </SubscriptionProvider>
      );

      expect(Number(screen.getByTestId('invoice-count').textContent)).toBe(3);
    });

    it('should start with no credentials', () => {
      render(
        <SubscriptionProvider>
          <TestConsumer />
        </SubscriptionProvider>
      );

      expect(screen.getByTestId('credential-count')).toHaveTextContent('0');
    });
  });

  describe('getAccessStatus', () => {
    it('should allow access when no course is specified', () => {
      render(
        <SubscriptionProvider>
          <TestConsumer courseForAccess={null} />
        </SubscriptionProvider>
      );

      // No access status rendered when courseForAccess is null
      expect(screen.queryByTestId('access-allowed')).not.toBeInTheDocument();
    });

    it('should allow access for a course matching a license scope', () => {
      const course = { category: 'psychedelic-therapy', ceCredits: 0 };
      render(
        <SubscriptionProvider>
          <TestConsumer courseForAccess={course} />
        </SubscriptionProvider>
      );

      expect(screen.getByTestId('access-allowed')).toHaveTextContent('true');
    });

    it('should deny access when matching license has no available seats', () => {
      // The 'all' scope license (license-individual) has seats: 1, seatsUsed: 1
      // For a category not covered by other licenses, it matches the 'all' scope license first
      const course = { category: 'underwater-basket-weaving', ceCredits: 0 };
      render(
        <SubscriptionProvider>
          <TestConsumer courseForAccess={course} />
        </SubscriptionProvider>
      );

      expect(screen.getByTestId('access-allowed')).toHaveTextContent('false');
      expect(screen.getByTestId('access-reason')).toHaveTextContent('All licensed seats are in use');
    });

    it('should show remaining seats for allowed courses', () => {
      const course = { category: 'psychedelic-therapy', ceCredits: 0 };
      render(
        <SubscriptionProvider>
          <TestConsumer courseForAccess={course} />
        </SubscriptionProvider>
      );

      expect(screen.getByTestId('seats-remaining')).toBeDefined();
      expect(Number(screen.getByTestId('seats-remaining').textContent)).toBeGreaterThan(0);
    });
  });

  describe('registerEnrollment', () => {
    it('should increment seats used when enrolling', () => {
      const course = { category: 'psychedelic-therapy' };
      render(
        <SubscriptionProvider>
          <TestConsumer courseForEnroll={course} />
        </SubscriptionProvider>
      );

      const initialSeatsUsed = Number(screen.getByTestId('org-seats-used').textContent);
      fireEvent.click(screen.getByText('enroll'));
      const newSeatsUsed = Number(screen.getByTestId('org-seats-used').textContent);
      expect(newSeatsUsed).toBe(initialSeatsUsed + 1);
    });
  });

  describe('releaseSeat', () => {
    it('should decrement seats used when releasing', () => {
      const course = { category: 'psychedelic-therapy' };
      render(
        <SubscriptionProvider>
          <TestConsumer courseForRelease={course} />
        </SubscriptionProvider>
      );

      const initialSeatsUsed = Number(screen.getByTestId('org-seats-used').textContent);
      fireEvent.click(screen.getByText('release'));
      const newSeatsUsed = Number(screen.getByTestId('org-seats-used').textContent);
      expect(newSeatsUsed).toBe(initialSeatsUsed - 1);
    });
  });

  describe('issueVerifiableCredential', () => {
    it('should issue a credential and increment count', () => {
      render(
        <SubscriptionProvider>
          <TestConsumer />
        </SubscriptionProvider>
      );

      expect(screen.getByTestId('credential-count')).toHaveTextContent('0');
      fireEvent.click(screen.getByText('issue-credential'));
      expect(screen.getByTestId('credential-count')).toHaveTextContent('1');
    });
  });
});

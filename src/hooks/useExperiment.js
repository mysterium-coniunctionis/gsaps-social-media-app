/**
 * Simple experiment hook for A/B testing
 * Returns the control variant by default
 */
export const useExperiment = (experimentName, variants) => {
  // For now, always return the first variant (control)
  // In the future, this could be connected to a feature flag service
  return variants[0];
};

import { useExperiment } from './useExperiment';

describe('useExperiment', () => {
  it('should return the first variant (control) by default', () => {
    const result = useExperiment('test-experiment', ['control', 'variant-a']);
    expect(result).toBe('control');
  });

  it('should return the first element of any variants array', () => {
    const result = useExperiment('another-experiment', ['alpha', 'beta', 'gamma']);
    expect(result).toBe('alpha');
  });

  it('should handle a single variant', () => {
    const result = useExperiment('single-variant', ['only-option']);
    expect(result).toBe('only-option');
  });

  it('should accept any experiment name string', () => {
    const result1 = useExperiment('feature-flag-123', ['off', 'on']);
    const result2 = useExperiment('new-ui-rollout', ['old', 'new']);
    expect(result1).toBe('off');
    expect(result2).toBe('old');
  });
});

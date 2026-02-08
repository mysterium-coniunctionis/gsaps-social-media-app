import { useExperiment } from './useExperiment';

describe('useExperiment', () => {
  it('returns the first variant (control) by default', () => {
    const result = useExperiment('test-exp', ['control', 'variant-a', 'variant-b']);
    expect(result).toBe('control');
  });

  it('returns the first variant from any list', () => {
    const result = useExperiment('test-exp', ['alpha', 'beta']);
    expect(result).toBe('alpha');
  });

  it('handles single variant', () => {
    const result = useExperiment('test-exp', ['only-variant']);
    expect(result).toBe('only-variant');
  });
});

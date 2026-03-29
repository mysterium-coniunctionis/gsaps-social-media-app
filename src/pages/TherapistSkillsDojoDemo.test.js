import {
  applyAllianceShift,
  buildPatientResponse,
  chooseDefense,
  detectTherapistStyle,
  makeBaselineAlliance
} from './TherapistSkillsDojoDemo';

describe('TherapistSkillsDojoDemo protocol engine', () => {
  it('classifies therapist style from intervention text', () => {
    expect(detectTherapistStyle('You are overreacting, just relax')).toBe('invalidating');
    expect(detectTherapistStyle('Deep down this is because of your fear')).toBe('interpretive');
    expect(detectTherapistStyle('You should make a plan')).toBe('directive');
    expect(detectTherapistStyle('That sounds hard, we can slow down')).toBe('empathic');
    expect(detectTherapistStyle('Tell me more')).toBe('vague');
  });

  it('adjusts alliance state by style and challenge level', () => {
    const baseline = makeBaselineAlliance('intermediate');
    const shifted = applyAllianceShift(baseline, 'empathic', 'intermediate');

    expect(shifted.safety).toBeGreaterThan(baseline.safety);
    expect(shifted.trust).toBeGreaterThan(baseline.trust);
    expect(shifted.shame).toBeLessThan(baseline.shame);
  });

  it('selects defense style from alliance state', () => {
    expect(chooseDefense({ safety: 50, trust: 50, shame: 75, resistance: 72 })).toBe('shutdown');
    expect(chooseDefense({ safety: 30, trust: 50, shame: 40, resistance: 45 })).toBe('intellectualize');
    expect(chooseDefense({ safety: 70, trust: 70, shame: 30, resistance: 20 })).toBe('partial_openness');
  });

  it('branches response by alliance and therapist style', () => {
    const ruptured = buildPatientResponse({
      stage: 'working',
      style: 'invalidating',
      turnCount: 4,
      alliance: { safety: 20, trust: 25, shame: 75, resistance: 78, hope: 20 }
    });

    const softened = buildPatientResponse({
      stage: 'working',
      style: 'empathic',
      turnCount: 5,
      alliance: { safety: 70, trust: 72, shame: 30, resistance: 20, hope: 68 }
    });

    expect(ruptured).toMatch(/dismissive|shut|blank|never mind|pulling away|flattening/i);
    expect(softened).toMatch(/less on guard|landed better|helped|stay present|avoided saying/i);
  });
});

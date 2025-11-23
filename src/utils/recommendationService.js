import { useEffect, useState } from 'react';

const SIGNAL_STORAGE_KEY = 'gsaps_recommendation_signals';
const EXPERIMENT_STORAGE_KEY = 'gsaps_recommendation_experiments';

const ACTION_WEIGHTS = {
  view: 1,
  click: 3,
  save: 4,
  enroll: 5,
  rsvp: 4,
  join: 4,
  complete: 6,
  search: 1.5
};

const DEFAULT_SIGNALS = {
  topics: {},
  categories: {},
  levels: {},
  keywords: {},
  recency: []
};

const loadSignals = () => {
  if (typeof window === 'undefined') return { ...DEFAULT_SIGNALS };
  try {
    const raw = localStorage.getItem(SIGNAL_STORAGE_KEY);
    return raw ? { ...DEFAULT_SIGNALS, ...JSON.parse(raw) } : { ...DEFAULT_SIGNALS };
  } catch (error) {
    console.warn('Failed to load recommendation signals', error);
    return { ...DEFAULT_SIGNALS };
  }
};

const saveSignals = (signals) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SIGNAL_STORAGE_KEY, JSON.stringify(signals));
};

const loadExperiments = () => {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(EXPERIMENT_STORAGE_KEY) || '{}');
  } catch (error) {
    console.warn('Failed to load experiment data', error);
    return {};
  }
};

const saveExperiments = (experiments) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(EXPERIMENT_STORAGE_KEY, JSON.stringify(experiments));
};

const normalizeWeights = (bucket) => {
  const entries = Object.entries(bucket);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  if (!total) return {};

  return entries.reduce((acc, [key, value]) => ({
    ...acc,
    [key]: value / total
  }), {});
};

const getItemFeatures = (item) => {
  const features = {
    topics: [],
    categories: [],
    levels: [],
    keywords: []
  };

  if (item.topics) features.topics = item.topics;
  if (item.category) features.categories = [item.category];
  if (item.categories) features.categories = [...features.categories, ...item.categories];
  if (item.level) features.levels = [item.level];
  if (item.keywords) features.keywords = item.keywords;
  if (item.tags) {
    features.keywords = [...features.keywords, ...item.tags];
    features.topics = [...features.topics, ...item.tags];
  }

  return features;
};

const addWeight = (bucket, key, weight) => {
  if (!key) return;
  bucket[key] = (bucket[key] || 0) + weight;
};

export const logInteraction = (type, item, action = 'view') => {
  const signals = loadSignals();
  const weight = ACTION_WEIGHTS[action] || 1;
  const features = getItemFeatures(item);

  features.topics.forEach(topic => addWeight(signals.topics, topic, weight));
  features.categories.forEach(category => addWeight(signals.categories, category, weight));
  features.levels.forEach(level => addWeight(signals.levels, level, weight));
  features.keywords.forEach(keyword => addWeight(signals.keywords, keyword, weight / 2));

  signals.recency = [
    {
      type,
      id: item.id,
      category: item.category || null,
      topics: item.topics || item.tags || [],
      timestamp: Date.now()
    },
    ...signals.recency.filter(entry => entry.id !== item.id)
  ].slice(0, 25);

  saveSignals(signals);
};

const buildUserProfile = () => {
  const signals = loadSignals();
  return {
    topics: normalizeWeights(signals.topics),
    categories: normalizeWeights(signals.categories),
    levels: normalizeWeights(signals.levels),
    keywords: normalizeWeights(signals.keywords),
    recentTopics: signals.recency.flatMap(entry => entry.topics).slice(0, 10)
  };
};

const baseQualityScore = (item) => {
  const popularity = item.views || item.studentsEnrolled || item.memberCount || item.attendeeCount || 0;
  const engagementScore = Math.log(1 + popularity);
  const ratingScore = item.rating ? item.rating * 0.6 : 0;
  const badgeBonus = item.featured || item.trending ? 1.2 : 0;

  return engagementScore + ratingScore + badgeBonus;
};

const relevanceScore = (item, profile) => {
  const features = getItemFeatures(item);
  const scoreFromBucket = (values, bucket, multiplier = 1) =>
    values.reduce((sum, value) => sum + (bucket[value] || 0) * multiplier, 0);

  const topical = scoreFromBucket(features.topics, profile.topics, 2.2);
  const categorical = scoreFromBucket(features.categories, profile.categories, 1.8);
  const levelFit = scoreFromBucket(features.levels, profile.levels, 1.2);
  const keywordFit = scoreFromBucket(features.keywords, profile.keywords, 0.8);
  const recencyBoost = features.topics.some(topic => profile.recentTopics.includes(topic)) ? 0.4 : 0;

  return topical + categorical + levelFit + keywordFit + recencyBoost;
};

export const getRecommendations = (type, items, { limit = 6, diversify = true, variant = 'personalized' } = {}) => {
  if (!items?.length) return [];
  const profile = buildUserProfile();

  const scored = items.map(item => {
    const personalizedScore = relevanceScore(item, profile) + baseQualityScore(item);
    const controlScore = baseQualityScore(item);
    const finalScore = variant === 'control' ? controlScore : personalizedScore;

    return {
      item,
      score: finalScore + Math.random() * 0.01 // slight shuffle to avoid ties
    };
  });

  scored.sort((a, b) => b.score - a.score);

  if (!diversify) {
    return scored.slice(0, limit).map(entry => entry.item);
  }

  const byCategory = new Map();
  for (const entry of scored) {
    const categoryKey = entry.item.category || entry.item.categories?.[0] || 'general';
    if (!byCategory.has(categoryKey)) byCategory.set(categoryKey, []);
    byCategory.get(categoryKey).push(entry.item);
  }

  const blended = [];
  const categoryQueues = Array.from(byCategory.values());
  while (blended.length < limit && categoryQueues.some(queue => queue.length > 0)) {
    categoryQueues.forEach(queue => {
      if (queue.length && blended.length < limit) {
        blended.push(queue.shift());
      }
    });
  }

  return blended;
};

export const useExperiment = (experimentId, variants = ['control', 'personalized']) => {
  const [variant, setVariant] = useState(variants[0]);

  useEffect(() => {
    const experiments = loadExperiments();
    const existing = experiments[experimentId];

    if (existing?.variant && variants.includes(existing.variant)) {
      setVariant(existing.variant);
      return;
    }

    const assigned = variants[Math.floor(Math.random() * variants.length)];
    experiments[experimentId] = { variant: assigned, impressions: 0, conversions: 0 };
    saveExperiments(experiments);
    setVariant(assigned);
  }, [experimentId, variants]);

  return variant;
};

export const recordExperimentImpression = (experimentId, variant, count = 1) => {
  const experiments = loadExperiments();
  const experiment = experiments[experimentId] || { variant, impressions: 0, conversions: 0 };
  experiment.variant = variant;
  experiment.impressions += count;
  experiments[experimentId] = experiment;
  saveExperiments(experiments);
};

export const recordExperimentConversion = (experimentId, variant, weight = 1) => {
  const experiments = loadExperiments();
  const experiment = experiments[experimentId] || { variant, impressions: 0, conversions: 0 };
  experiment.variant = variant;
  experiment.conversions += weight;
  experiments[experimentId] = experiment;
  saveExperiments(experiments);
};

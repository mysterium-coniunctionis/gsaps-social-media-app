/**
 * Circle Matching Algorithm
 *
 * Matches users to integration circles based on their preferences.
 * Uses a weighted scoring system to find the best matches.
 *
 * Scoring weights:
 * - Experience type match: 30%
 * - Location/virtual preference: 25%
 * - Schedule compatibility: 20%
 * - Values alignment: 15%
 * - Capacity available: 10%
 */

/**
 * Calculate the match score between user preferences and a circle
 * @param {Object} preferences - User's circle preferences
 * @param {Object} circle - Circle to score against
 * @returns {number} Score between 0 and 1
 */
export const calculateMatchScore = (preferences, circle) => {
  let score = 0;

  // Experience type match (30%)
  if (preferences.experienceType) {
    if (circle.experienceTypes.includes(preferences.experienceType)) {
      score += 0.3;
    } else if (circle.experienceTypes.includes('general')) {
      score += 0.15; // Partial match for general circles
    }
  } else {
    // No preference means all circles are equally good
    score += 0.15;
  }

  // Location match (25%)
  if (preferences.locationType) {
    if (preferences.locationType === 'virtual' &&
        (circle.location.type === 'virtual' || circle.location.type === 'hybrid')) {
      score += 0.25;
    } else if (preferences.locationType === 'in-person') {
      if (circle.location.type === 'in-person' || circle.location.type === 'hybrid') {
        // Check city/state match for in-person
        if (preferences.city && circle.location.city) {
          if (circle.location.city.toLowerCase() === preferences.city.toLowerCase()) {
            score += 0.25;
          } else if (preferences.state && circle.location.state === preferences.state) {
            score += 0.15; // Same state but different city
          } else {
            score += 0.05; // In-person but different location
          }
        } else {
          score += 0.15;
        }
      }
    } else if (preferences.locationType === 'either') {
      // Either is fine
      score += 0.2;
    }
  } else {
    score += 0.125; // No preference
  }

  // Schedule compatibility (20%)
  if (preferences.preferredDays && preferences.preferredDays.length > 0) {
    if (preferences.preferredDays.includes(circle.meetingSchedule.dayOfWeek)) {
      score += 0.2;
    } else {
      // Partial credit for close days (e.g., adjacent days)
      const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const circleDay = dayOrder.indexOf(circle.meetingSchedule.dayOfWeek);
      const preferredIndices = preferences.preferredDays.map(d => dayOrder.indexOf(d));
      const minDistance = Math.min(...preferredIndices.map(i => Math.min(Math.abs(i - circleDay), 7 - Math.abs(i - circleDay))));
      if (minDistance === 1) {
        score += 0.1; // Adjacent day
      } else if (minDistance === 2) {
        score += 0.05; // Two days away
      }
    }
  } else {
    score += 0.1; // No preference
  }

  // Time preference (bonus within schedule score)
  if (preferences.preferredTimes && preferences.preferredTimes.length > 0 && circle.meetingSchedule.time) {
    const hour = parseInt(circle.meetingSchedule.time.split(':')[0]);
    const circleTime = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

    // Weekend check
    const isWeekend = circle.meetingSchedule.dayOfWeek === 'Saturday' ||
                      circle.meetingSchedule.dayOfWeek === 'Sunday';

    if (preferences.preferredTimes.includes(circleTime) ||
        (isWeekend && preferences.preferredTimes.includes('weekend'))) {
      // Already accounted for in schedule score
    }
  }

  // Values alignment (15%)
  if (preferences.values && preferences.values.length > 0 && circle.values) {
    const matchingValues = circle.values.filter(v =>
      preferences.values.some(pv =>
        v.toLowerCase().includes(pv.toLowerCase()) ||
        pv.toLowerCase().includes(v.toLowerCase())
      )
    ).length;
    const alignmentRatio = matchingValues / Math.max(preferences.values.length, 1);
    score += alignmentRatio * 0.15;
  } else {
    score += 0.075; // No preference
  }

  // Capacity available (10%)
  if (circle.members && circle.capacity) {
    const availableSpots = circle.capacity - circle.members.length;
    if (availableSpots > 0) {
      const availabilityRatio = availableSpots / circle.capacity;
      score += availabilityRatio * 0.1;
    }
    // If full, no bonus points
  } else {
    score += 0.05; // Assume some capacity
  }

  // Circle purpose match (bonus)
  if (preferences.circlePurpose && circle.category) {
    const purposeCategoryMap = {
      'integration': 'psychedelic-integration',
      'preparation': 'preparation',
      'harm-reduction': 'harm-reduction',
      'professional': 'clinical-practitioners'
    };
    if (circle.category === purposeCategoryMap[preferences.circlePurpose]) {
      score += 0.05; // Bonus for purpose match
    }
  }

  // Group size preference (bonus)
  if (preferences.capacity) {
    const circleSize = circle.members ? circle.members.length : 0;
    const capacityRanges = {
      'intimate': [0, 6],
      'medium': [6, 12],
      'large': [12, 20]
    };
    const range = capacityRanges[preferences.capacity];
    if (range && circleSize >= range[0] && circleSize < range[1]) {
      score += 0.03; // Bonus for preferred size
    }
  }

  // Normalize score to max 1.0
  return Math.min(score, 1.0);
};

/**
 * Match a user to the best circles based on their preferences
 * @param {Object} userPreferences - User's circle preferences
 * @param {Array} availableCircles - List of available circles
 * @param {Object} options - Options for matching
 * @param {number} options.minScore - Minimum score threshold (default: 0.3)
 * @param {number} options.maxResults - Maximum number of results (default: 10)
 * @returns {Array} Array of { circle, score, matchReasons } sorted by score
 */
export const matchUserToCircles = (userPreferences, availableCircles, options = {}) => {
  const { minScore = 0.3, maxResults = 10 } = options;

  if (!availableCircles || availableCircles.length === 0) {
    return [];
  }

  // If no preferences provided, return all active circles sorted by popularity
  if (!userPreferences || Object.keys(userPreferences).length === 0) {
    return availableCircles
      .filter(c => c.status === 'active')
      .map(circle => ({
        circle,
        score: 0.5,
        matchReasons: ['No preferences set - showing popular circles']
      }))
      .sort((a, b) => (b.circle.members?.length || 0) - (a.circle.members?.length || 0))
      .slice(0, maxResults);
  }

  const matches = availableCircles
    .filter(circle => circle.status === 'active')
    .map(circle => {
      const score = calculateMatchScore(userPreferences, circle);
      const matchReasons = getMatchReasons(userPreferences, circle);

      return {
        circle,
        score,
        matchReasons
      };
    })
    .filter(match => match.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);

  return matches;
};

/**
 * Get human-readable reasons why a circle matches preferences
 * @param {Object} preferences - User preferences
 * @param {Object} circle - Circle to analyze
 * @returns {Array} Array of match reason strings
 */
export const getMatchReasons = (preferences, circle) => {
  const reasons = [];

  // Experience type
  if (preferences.experienceType && circle.experienceTypes.includes(preferences.experienceType)) {
    reasons.push(`Supports ${preferences.experienceType} integration`);
  }

  // Location
  if (preferences.locationType === 'virtual' &&
      (circle.location.type === 'virtual' || circle.location.type === 'hybrid')) {
    reasons.push('Virtual meetings available');
  } else if (preferences.locationType === 'in-person' &&
             (circle.location.type === 'in-person' || circle.location.type === 'hybrid')) {
    if (preferences.city && circle.location.city?.toLowerCase() === preferences.city.toLowerCase()) {
      reasons.push(`Located in ${circle.location.city}`);
    } else {
      reasons.push('In-person meetings');
    }
  }

  // Schedule
  if (preferences.preferredDays?.includes(circle.meetingSchedule.dayOfWeek)) {
    reasons.push(`Meets on ${circle.meetingSchedule.dayOfWeek}s`);
  }

  // Values
  if (preferences.values && preferences.values.length > 0 && circle.values) {
    const matchingValues = circle.values.filter(v =>
      preferences.values.some(pv =>
        v.toLowerCase().includes(pv.toLowerCase()) ||
        pv.toLowerCase().includes(v.toLowerCase())
      )
    );
    if (matchingValues.length > 0) {
      reasons.push(`Values: ${matchingValues.slice(0, 2).join(', ')}`);
    }
  }

  // Capacity
  if (circle.members && circle.capacity) {
    const availableSpots = circle.capacity - circle.members.length;
    if (availableSpots > 3) {
      reasons.push('Spots available');
    } else if (availableSpots > 0) {
      reasons.push(`${availableSpots} spots left`);
    }
  }

  // Default reason if none found
  if (reasons.length === 0) {
    reasons.push('Active community');
  }

  return reasons;
};

/**
 * Get recommended circles for a user (quick match without wizard)
 * Based on user's existing profile and activity
 * @param {Object} user - Current user object
 * @param {Array} circles - Available circles
 * @param {Array} userCircles - Circles user is already a member of
 * @returns {Array} Top 3 recommended circles
 */
export const getQuickRecommendations = (user, circles, userCircles = []) => {
  const userCircleIds = userCircles.map(c => c.id);

  // Filter out circles user is already in
  const availableCircles = circles.filter(c =>
    !userCircleIds.includes(c.id) && c.status === 'active'
  );

  // Create preferences from user profile if available
  const inferredPreferences = {};

  if (user?.interests) {
    // Try to infer experience type from interests
    const experienceKeywords = {
      'psilocybin': ['psilocybin', 'mushroom', 'fungi'],
      'MDMA': ['mdma', 'therapy', 'ptsd'],
      'ayahuasca': ['ayahuasca', 'plant medicine', 'ceremony'],
      'ketamine': ['ketamine', 'kap'],
      'LSD': ['lsd', 'acid'],
      'general': ['integration', 'support', 'healing']
    };

    for (const [type, keywords] of Object.entries(experienceKeywords)) {
      if (keywords.some(kw => user.interests.toLowerCase().includes(kw))) {
        inferredPreferences.experienceType = type;
        break;
      }
    }
  }

  // Use matching algorithm with inferred preferences
  const matches = matchUserToCircles(inferredPreferences, availableCircles, {
    minScore: 0.2,
    maxResults: 3
  });

  return matches;
};

/**
 * Default user preferences template
 */
export const DEFAULT_PREFERENCES = {
  experienceType: null,
  circlePurpose: 'integration',
  locationType: 'either',
  city: null,
  state: null,
  preferredDays: [],
  preferredTimes: [],
  values: [],
  capacity: 'medium'
};

/**
 * Available values for preferences
 */
export const PREFERENCE_OPTIONS = {
  experienceTypes: [
    { value: 'psilocybin', label: 'Psilocybin' },
    { value: 'MDMA', label: 'MDMA' },
    { value: 'ayahuasca', label: 'Ayahuasca' },
    { value: 'ketamine', label: 'Ketamine' },
    { value: 'LSD', label: 'LSD' },
    { value: 'ibogaine', label: 'Ibogaine' },
    { value: '5-MeO-DMT', label: '5-MeO-DMT' },
    { value: 'general', label: 'General / Multiple' }
  ],
  circlePurposes: [
    { value: 'integration', label: 'Integration (post-experience support)' },
    { value: 'preparation', label: 'Preparation (pre-experience guidance)' },
    { value: 'harm-reduction', label: 'Harm Reduction (safety-focused)' },
    { value: 'professional', label: 'Professional Development (for practitioners)' }
  ],
  locationTypes: [
    { value: 'virtual', label: 'Virtual Only' },
    { value: 'in-person', label: 'In-Person Only' },
    { value: 'either', label: 'Either' }
  ],
  days: [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' }
  ],
  times: [
    { value: 'morning', label: 'Morning (before 12pm)' },
    { value: 'afternoon', label: 'Afternoon (12pm-5pm)' },
    { value: 'evening', label: 'Evening (after 5pm)' },
    { value: 'weekend', label: 'Weekends' }
  ],
  values: [
    { value: 'trauma-informed', label: 'Trauma-Informed' },
    { value: 'LGBTQ+ friendly', label: 'LGBTQ+ Friendly' },
    { value: 'BIPOC-centered', label: 'BIPOC-Centered' },
    { value: 'spiritual', label: 'Spiritual/Contemplative' },
    { value: 'scientific', label: 'Science-Based' },
    { value: 'somatic', label: 'Somatic/Body-Based' },
    { value: 'peer-led', label: 'Peer-Led' },
    { value: 'professional-led', label: 'Professional-Led' },
    { value: 'confidential', label: 'Confidential' },
    { value: 'secular', label: 'Secular' }
  ],
  capacities: [
    { value: 'intimate', label: 'Intimate (up to 6 people)' },
    { value: 'medium', label: 'Medium (6-12 people)' },
    { value: 'large', label: 'Large (12+ people)' }
  ]
};

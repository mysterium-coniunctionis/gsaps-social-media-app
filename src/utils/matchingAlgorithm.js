/**
 * Smart Mentor Matching Algorithm
 * Multi-dimensional compatibility scoring for professional networking
 */

/**
 * Calculate expertise overlap between two professionals
 * @param {Array} expertise1 - First person's expertise areas
 * @param {Array} expertise2 - Second person's expertise areas
 * @returns {number} - Overlap score (0-1)
 */
const calculateExpertiseOverlap = (expertise1, expertise2) => {
  if (!expertise1?.length || !expertise2?.length) return 0;

  const set1 = new Set(expertise1.map(e => e.toLowerCase()));
  const set2 = new Set(expertise2.map(e => e.toLowerCase()));

  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  // Jaccard similarity
  return intersection.size / union.size;
};

/**
 * Calculate research interests alignment
 * @param {Array} interests1 - First person's research interests
 * @param {Array} interests2 - Second person's research interests
 * @returns {number} - Alignment score (0-1)
 */
const calculateResearchAlignment = (interests1, interests2) => {
  if (!interests1?.length || !interests2?.length) return 0;

  const set1 = new Set(interests1.map(i => i.toLowerCase()));
  const set2 = new Set(interests2.map(i => i.toLowerCase()));

  const intersection = new Set([...set1].filter(x => set2.has(x)));

  return intersection.size / Math.min(set1.size, set2.size);
};

/**
 * Calculate optimal experience gap for mentoring relationships
 * Best mentoring occurs with 3-7 years experience gap
 * @param {number} experience1 - First person's years of experience
 * @param {number} experience2 - Second person's years of experience
 * @param {string} relationshipType - Type of relationship (mentor, peer, etc.)
 * @returns {number} - Experience gap score (0-1)
 */
const calculateExperienceGap = (experience1, experience2, relationshipType = 'mentor') => {
  const gap = Math.abs(experience1 - experience2);

  if (relationshipType === 'peer') {
    // For peers, prefer similar experience levels (0-3 years gap)
    if (gap <= 3) return 1;
    if (gap <= 5) return 0.7;
    if (gap <= 7) return 0.4;
    return 0.2;
  }

  if (relationshipType === 'mentor') {
    // For mentoring, optimal gap is 3-7 years
    if (gap >= 3 && gap <= 7) return 1;
    if (gap >= 2 && gap <= 10) return 0.8;
    if (gap >= 1 && gap <= 15) return 0.6;
    if (gap > 15) return 0.4;
    return 0.3; // Very small gap
  }

  // Default scoring for other relationships
  return 0.5;
};

/**
 * Calculate availability match
 * @param {string} availability1 - First person's availability (high, medium, low)
 * @param {string} availability2 - Second person's availability
 * @returns {number} - Availability match score (0-1)
 */
const calculateAvailabilityMatch = (availability1, availability2) => {
  const availabilityScores = { high: 3, medium: 2, low: 1 };

  const score1 = availabilityScores[availability1] || 2;
  const score2 = availabilityScores[availability2] || 2;

  // Prefer when at least one person has higher availability
  const maxAvailability = Math.max(score1, score2);
  const minAvailability = Math.min(score1, score2);

  if (maxAvailability === 3 && minAvailability >= 2) return 1;
  if (maxAvailability === 3) return 0.8;
  if (maxAvailability === 2 && minAvailability === 2) return 0.7;
  if (maxAvailability === 2) return 0.5;
  return 0.3; // Both low availability
};

/**
 * Calculate goals alignment
 * @param {Array} goals1 - First person's goals
 * @param {Array} goals2 - Second person's goals
 * @returns {number} - Goals alignment score (0-1)
 */
const calculateGoalsAlignment = (goals1, goals2) => {
  if (!goals1?.length || !goals2?.length) return 0;

  const complementaryPairs = [
    ['mentor', 'seeking-mentor'],
    ['seeking-mentor', 'mentor'],
    ['peer-collaboration', 'peer-collaboration'],
    ['research-collaboration', 'research-collaboration']
  ];

  // Check for complementary goals
  let maxScore = 0;
  for (const goal1 of goals1) {
    for (const goal2 of goals2) {
      if (goal1 === goal2) {
        maxScore = Math.max(maxScore, 0.8);
      }

      for (const [g1, g2] of complementaryPairs) {
        if ((goal1 === g1 && goal2 === g2) || (goal1 === g2 && goal2 === g1)) {
          maxScore = Math.max(maxScore, 1);
        }
      }
    }
  }

  return maxScore;
};

/**
 * Calculate communication style compatibility
 * @param {string} style1 - First person's communication style
 * @param {string} style2 - Second person's communication style
 * @returns {number} - Communication compatibility score (0-1)
 */
const calculateCommunicationStyle = (style1, style2) => {
  const compatibilityMatrix = {
    collaborative: { collaborative: 1, flexible: 0.9, directive: 0.6 },
    flexible: { collaborative: 0.9, flexible: 1, directive: 0.8 },
    directive: { collaborative: 0.6, flexible: 0.8, directive: 0.7 }
  };

  return compatibilityMatrix[style1]?.[style2] || 0.5;
};

/**
 * Calculate mutual connections boost
 * @param {Array} connections1 - First person's connection IDs
 * @param {Array} connections2 - Second person's connection IDs
 * @returns {number} - Mutual connections score (0-1)
 */
const calculateMutualConnections = (connections1 = [], connections2 = []) => {
  if (!connections1.length || !connections2.length) return 0;

  const set1 = new Set(connections1);
  const mutualCount = connections2.filter(c => set1.has(c)).length;

  // Logarithmic scaling for mutual connections
  if (mutualCount === 0) return 0;
  if (mutualCount === 1) return 0.3;
  if (mutualCount === 2) return 0.5;
  if (mutualCount <= 4) return 0.7;
  if (mutualCount <= 7) return 0.9;
  return 1;
};

/**
 * Calculate location proximity bonus
 * @param {string} location1 - First person's location
 * @param {string} location2 - Second person's location
 * @returns {number} - Location proximity bonus (0-0.1)
 */
const calculateLocationProximity = (location1, location2) => {
  if (!location1 || !location2) return 0;

  // Same city
  if (location1.toLowerCase() === location2.toLowerCase()) return 0.1;

  // Same state (basic check)
  const state1 = location1.split(',').pop()?.trim();
  const state2 = location2.split(',').pop()?.trim();
  if (state1 && state2 && state1 === state2) return 0.05;

  return 0;
};

/**
 * Main matching score calculation
 * @param {Object} person1 - First professional profile
 * @param {Object} person2 - Second professional profile
 * @param {Object} weights - Custom weights for different factors
 * @returns {Object} - Match score and breakdown
 */
export const calculateMatchScore = (person1, person2, weights = {}) => {
  // Default weights based on the algorithm specification
  const defaultWeights = {
    expertiseOverlap: 0.25,
    experienceGap: 0.20,
    availabilityMatch: 0.15,
    goalsAlignment: 0.20,
    mutualConnections: 0.10,
    communicationStyle: 0.10
  };

  const w = { ...defaultWeights, ...weights };

  // Determine relationship type for experience gap calculation
  const isSeekingMentor = person1.goals?.includes('seeking-mentor') &&
                          person2.goals?.includes('mentor');
  const isMentoring = person1.goals?.includes('mentor') &&
                      person2.goals?.includes('seeking-mentor');
  const isPeerRelationship = person1.goals?.includes('peer-collaboration') &&
                             person2.goals?.includes('peer-collaboration');

  let relationshipType = 'mentor';
  if (isPeerRelationship) relationshipType = 'peer';

  // Calculate individual scores
  const expertiseScore = calculateExpertiseOverlap(
    person1.expertise,
    person2.expertise
  );

  const researchScore = calculateResearchAlignment(
    person1.researchInterests,
    person2.researchInterests
  );

  // Combine expertise and research interests for expertise overlap
  const combinedExpertiseScore = (expertiseScore * 0.6) + (researchScore * 0.4);

  const experienceScore = calculateExperienceGap(
    person1.yearsExperience,
    person2.yearsExperience,
    relationshipType
  );

  const availabilityScore = calculateAvailabilityMatch(
    person1.availability,
    person2.availability
  );

  const goalsScore = calculateGoalsAlignment(
    person1.goals,
    person2.goals
  );

  const communicationScore = calculateCommunicationStyle(
    person1.communicationStyle,
    person2.communicationStyle
  );

  const mutualScore = calculateMutualConnections(
    person1.connections,
    person2.connections
  );

  const locationBonus = calculateLocationProximity(
    person1.location,
    person2.location
  );

  // Calculate weighted total score
  const totalScore = (
    combinedExpertiseScore * w.expertiseOverlap +
    experienceScore * w.experienceGap +
    availabilityScore * w.availabilityMatch +
    goalsScore * w.goalsAlignment +
    mutualScore * w.mutualConnections +
    communicationScore * w.communicationStyle +
    locationBonus
  );

  // Normalize to 0-100 scale
  const normalizedScore = Math.min(100, Math.round(totalScore * 100));

  return {
    totalScore: normalizedScore,
    breakdown: {
      expertise: Math.round(combinedExpertiseScore * 100),
      experience: Math.round(experienceScore * 100),
      availability: Math.round(availabilityScore * 100),
      goals: Math.round(goalsScore * 100),
      communication: Math.round(communicationScore * 100),
      mutualConnections: Math.round(mutualScore * 100)
    },
    relationshipType,
    reasoning: generateMatchReasoning({
      expertiseScore: combinedExpertiseScore,
      experienceScore,
      goalsScore,
      mutualScore,
      locationBonus,
      person1,
      person2,
      relationshipType
    })
  };
};

/**
 * Generate human-readable explanation for match
 * @param {Object} scores - Individual component scores
 * @returns {Array} - Array of reason strings
 */
const generateMatchReasoning = ({
  expertiseScore,
  experienceScore,
  goalsScore,
  mutualScore,
  locationBonus,
  person1,
  person2,
  relationshipType
}) => {
  const reasons = [];

  // Expertise overlap
  if (expertiseScore >= 0.6) {
    const commonExpertise = person1.expertise?.filter(e1 =>
      person2.expertise?.some(e2 => e1.toLowerCase() === e2.toLowerCase())
    );
    if (commonExpertise?.length > 0) {
      reasons.push(`Strong overlap in ${commonExpertise.slice(0, 2).join(' and ')}`);
    }
  } else if (expertiseScore >= 0.3) {
    reasons.push('Complementary expertise areas');
  }

  // Experience level
  const expGap = Math.abs(person1.yearsExperience - person2.yearsExperience);
  if (relationshipType === 'mentor' && experienceScore >= 0.8) {
    reasons.push(`Ideal experience gap for mentoring (${expGap} years)`);
  } else if (relationshipType === 'peer' && experienceScore >= 0.7) {
    reasons.push('Similar career stages');
  }

  // Goals alignment
  if (goalsScore >= 0.8) {
    const isMentorMatch = (person1.goals?.includes('seeking-mentor') && person2.goals?.includes('mentor')) ||
                          (person2.goals?.includes('seeking-mentor') && person1.goals?.includes('mentor'));
    if (isMentorMatch) {
      reasons.push('Perfect mentor-mentee alignment');
    } else if (person1.goals?.includes('research-collaboration') && person2.goals?.includes('research-collaboration')) {
      reasons.push('Both seeking research collaboration');
    }
  }

  // Mutual connections
  if (mutualScore >= 0.5) {
    const mutualCount = Math.round(mutualScore * 7); // Estimate
    reasons.push(`${mutualCount} mutual connection${mutualCount > 1 ? 's' : ''}`);
  }

  // Location
  if (locationBonus >= 0.05) {
    if (locationBonus >= 0.1) {
      reasons.push('Same location - can meet in person');
    } else {
      reasons.push('Same region');
    }
  }

  // Response rate
  if (person2.responseRate >= 0.9) {
    reasons.push('Highly responsive (>90% response rate)');
  }

  return reasons;
};

/**
 * Find top matches for a given user
 * @param {Object} currentUser - Current user profile
 * @param {Array} allProfiles - Array of all professional profiles
 * @param {Object} options - Matching options
 * @returns {Array} - Sorted array of matches with scores
 */
export const findTopMatches = (currentUser, allProfiles, options = {}) => {
  const {
    limit = 10,
    minScore = 30,
    filterType = null, // 'mentor', 'mentee', 'peer', 'collaborator'
    weights = {}
  } = options;

  let candidateProfiles = allProfiles.filter(p => p.id !== currentUser.id);

  // Apply type filtering
  if (filterType === 'mentor') {
    candidateProfiles = candidateProfiles.filter(p =>
      p.mentoringPreferences?.willingToMentor &&
      currentUser.goals?.includes('seeking-mentor')
    );
  } else if (filterType === 'mentee') {
    candidateProfiles = candidateProfiles.filter(p =>
      p.mentoringPreferences?.seekingMentor &&
      currentUser.mentoringPreferences?.willingToMentor
    );
  } else if (filterType === 'peer') {
    candidateProfiles = candidateProfiles.filter(p =>
      p.goals?.includes('peer-collaboration')
    );
  } else if (filterType === 'collaborator') {
    candidateProfiles = candidateProfiles.filter(p =>
      p.goals?.includes('research-collaboration') ||
      p.collaborationInterests?.length > 0
    );
  }

  // Calculate match scores
  const matches = candidateProfiles.map(profile => {
    const matchData = calculateMatchScore(currentUser, profile, weights);
    return {
      profile,
      ...matchData
    };
  });

  // Filter by minimum score and sort
  return matches
    .filter(m => m.totalScore >= minScore)
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, limit);
};

/**
 * Cold start handling for new users
 * @param {Object} newUser - New user profile
 * @param {Array} allProfiles - All professional profiles
 * @returns {Array} - Recommended matches for new users
 */
export const getColdStartRecommendations = (newUser, allProfiles) => {
  // For new users, prioritize:
  // 1. High response rate
  // 2. Active mentors
  // 3. Similar interests

  const weights = {
    expertiseOverlap: 0.35,
    experienceGap: 0.25,
    availabilityMatch: 0.20,
    goalsAlignment: 0.15,
    mutualConnections: 0.00, // No mutual connections yet
    communicationStyle: 0.05
  };

  let recommendations = findTopMatches(newUser, allProfiles, { weights, limit: 15 });

  // Boost profiles with high response rates
  recommendations = recommendations.map(rec => ({
    ...rec,
    totalScore: rec.totalScore * (0.8 + rec.profile.responseRate * 0.2)
  })).sort((a, b) => b.totalScore - a.totalScore);

  return recommendations.slice(0, 10);
};

/**
 * Update match quality based on feedback
 * @param {string} matchId - Match identifier
 * @param {number} rating - User rating (1-5)
 * @param {Object} feedback - Additional feedback data
 */
export const recordMatchFeedback = (matchId, rating, feedback = {}) => {
  // In a real implementation, this would update the matching algorithm
  // based on user feedback to improve future recommendations

  console.log('Match feedback recorded:', {
    matchId,
    rating,
    feedback,
    timestamp: new Date().toISOString()
  });

  // This data would be used to:
  // 1. Adjust weights for individual users
  // 2. Identify patterns in successful matches
  // 3. Refine the algorithm over time

  return {
    success: true,
    message: 'Feedback recorded successfully'
  };
};

export default {
  calculateMatchScore,
  findTopMatches,
  getColdStartRecommendations,
  recordMatchFeedback
};

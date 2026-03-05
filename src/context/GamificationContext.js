import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { awardGamification, fetchGamification } from '../api/backend';
import { useAuth } from './AuthContext';

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

export const XP_ACTIONS = {
  // Social actions
  CREATE_POST: 10,
  POST_WITH_IMAGE: 15,
  POST_WITH_TAGS: 5,
  COMMENT: 5,
  SHARE_POST: 8,
  ADD_REACTION: 3,
  MESSAGE_SENT: 1,

  // Course actions
  ENROLL_COURSE: 10,
  COMPLETE_LESSON: 20,

  // Research Library actions
  UPLOAD_PAPER: 50,
  PAPER_APPROVED: 25,
  WRITE_REVIEW: 20,
  CREATE_COLLECTION: 15,
  SHARE_COLLECTION: 10,
  DISCUSSION_POST: 10,
  DISCUSSION_REPLY: 5,
  LIKE_COMMENT: 2,
  SAVE_TO_COLLECTION: 5
};

// Rank system based on level progression
export const RANKS = {
  1: { name: 'Novice', color: '#9e9e9e', icon: '🌱' },
  5: { name: 'Initiate', color: '#8bc34a', icon: '🌿' },
  10: { name: 'Apprentice', color: '#4caf50', icon: '🌳' },
  15: { name: 'Practitioner', color: '#00bcd4', icon: '💎' },
  20: { name: 'Adept', color: '#2196f3', icon: '⭐' },
  25: { name: 'Expert', color: '#3f51b5', icon: '🔮' },
  30: { name: 'Master', color: '#9c27b0', icon: '👑' },
  35: { name: 'Sage', color: '#e91e63', icon: '🧙' },
  40: { name: 'Luminary', color: '#ff9800', icon: '☀️' },
  45: { name: 'Transcendent', color: '#ffd700', icon: '✨' }
};

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 850, 1300];

const calculateLevel = (xp) => {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i -= 1) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
};

export const GamificationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['gamification', currentUser?.id],
    queryFn: fetchGamification,
    enabled: Boolean(currentUser)
  });

  const awardMutation = useMutation({
    mutationFn: ({ type, points }) => awardGamification({ type, points }),
    onSuccess: () => {
      queryClient.invalidateQueries(['gamification', currentUser?.id]);
    }
  });

  const awardXP = useCallback((action, customAmount = null) => {
    if (!currentUser) return;
    const points = customAmount ?? XP_ACTIONS[action] ?? 0;
    if (points <= 0) return;
    awardMutation.mutate({ type: action, points });
  }, [currentUser, awardMutation]);

  const userStats = useMemo(() => {
    const points = data?.points ?? 0;
    const achievements = data?.achievements ?? [];
    return {
      xp: points,
      level: calculateLevel(points),
      achievements,
      stats: {},
      points
    };
  }, [data]);

  const value = useMemo(
    () => ({
      userStats,
      loading: isLoading,
      awardXP,
      updateStat: () => {},
      recentXP: []
    }),
    [userStats, isLoading, awardXP]
  );

  return <GamificationContext.Provider value={value}>{children}</GamificationContext.Provider>;
};

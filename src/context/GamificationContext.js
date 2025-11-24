import React, { createContext, useContext, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { awardGamification, fetchGamification } from '../api/backend';
import { useAuth } from './AuthContext';

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

export const XP_ACTIONS = {
  CREATE_POST: 10,
  POST_WITH_IMAGE: 15,
  POST_WITH_TAGS: 5,
  COMMENT: 5,
  SHARE_POST: 8,
  ENROLL_COURSE: 10,
  COMPLETE_LESSON: 20,
  ADD_REACTION: 3,
  MESSAGE_SENT: 1,
  UPLOAD_PAPER: 50
};

export const RANKS = {
  1: { name: 'Novice', color: '#8bd3e6', icon: '🌱' },
  5: { name: 'Explorer', color: '#9fa8da', icon: '🧭' },
  10: { name: 'Scholar', color: '#f6c177', icon: '📚' },
  15: { name: 'Contributor', color: '#81c784', icon: '🤝' },
  20: { name: 'Mentor', color: '#ffb74d', icon: '🧠' },
  30: { name: 'Luminary', color: '#ba68c8', icon: '✨' },
  40: { name: 'Mythic', color: '#ef5350', icon: '🛡️' }
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

  const awardXP = (action, customAmount = null) => {
    if (!currentUser) return;
    const points = customAmount ?? XP_ACTIONS[action] ?? 0;
    if (points <= 0) return;
    awardMutation.mutate({ type: action, points });
  };

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
    [awardXP, userStats, isLoading]
  );

  return <GamificationContext.Provider value={value}>{children}</GamificationContext.Provider>;
};

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'a11y-preferences';

const defaultPreferences = {
  highContrast: false,
  largeText: false,
  reduceMotion: false,
  captions: true,
};

const AccessibilityContext = createContext({
  preferences: defaultPreferences,
  togglePreference: () => {},
  setPreference: () => {},
});

const applyBodyClasses = (preferences) => {
  const body = document.body;
  body.classList.toggle('high-contrast-mode', preferences.highContrast);
  body.classList.toggle('large-text-mode', preferences.largeText);
  body.classList.toggle('reduced-motion', preferences.reduceMotion);
  body.classList.toggle('captions-enabled', preferences.captions);
};

export const AccessibilityProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      } catch (error) {
        console.warn('Unable to parse accessibility preferences', error);
      }
    }
    return defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    applyBodyClasses(preferences);
  }, [preferences]);

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setPreference = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const value = useMemo(() => ({ preferences, togglePreference, setPreference }), [preferences]);

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);

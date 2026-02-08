import { SHORTCUTS, getShortcutsByCategory } from './useKeyboardShortcuts';

// Note: We test the pure utility functions and constants here.
// The useKeyboardShortcuts hook itself requires useNavigate from react-router-dom
// and is better tested in integration tests.

describe('useKeyboardShortcuts - utilities', () => {
  describe('SHORTCUTS', () => {
    it('should define navigation shortcuts', () => {
      expect(SHORTCUTS.GO_HOME).toBeDefined();
      expect(SHORTCUTS.GO_HOME.keys).toEqual(['g', 'h']);
      expect(SHORTCUTS.GO_HOME.category).toBe('Navigation');

      expect(SHORTCUTS.GO_FEED).toBeDefined();
      expect(SHORTCUTS.GO_FEED.keys).toEqual(['g', 'f']);

      expect(SHORTCUTS.GO_MESSAGES).toBeDefined();
      expect(SHORTCUTS.GO_MESSAGES.keys).toEqual(['g', 'm']);

      expect(SHORTCUTS.GO_LIBRARY).toBeDefined();
      expect(SHORTCUTS.GO_LIBRARY.keys).toEqual(['g', 'l']);

      expect(SHORTCUTS.GO_COURSES).toBeDefined();
      expect(SHORTCUTS.GO_COURSES.keys).toEqual(['g', 'c']);

      expect(SHORTCUTS.GO_SETTINGS).toBeDefined();
      expect(SHORTCUTS.GO_SETTINGS.keys).toEqual(['g', 's']);
    });

    it('should define action shortcuts', () => {
      expect(SHORTCUTS.NEW_POST).toBeDefined();
      expect(SHORTCUTS.NEW_POST.keys).toEqual(['n']);
      expect(SHORTCUTS.NEW_POST.category).toBe('Actions');

      expect(SHORTCUTS.SEARCH).toBeDefined();
      expect(SHORTCUTS.SEARCH.keys).toEqual(['/']);

      expect(SHORTCUTS.HELP).toBeDefined();
      expect(SHORTCUTS.HELP.keys).toEqual(['?']);

      expect(SHORTCUTS.ESCAPE).toBeDefined();
      expect(SHORTCUTS.ESCAPE.keys).toEqual(['Escape']);
    });

    it('should define feed navigation shortcuts', () => {
      expect(SHORTCUTS.NEXT_POST).toBeDefined();
      expect(SHORTCUTS.NEXT_POST.keys).toEqual(['j']);
      expect(SHORTCUTS.NEXT_POST.category).toBe('Feed');

      expect(SHORTCUTS.PREV_POST).toBeDefined();
      expect(SHORTCUTS.PREV_POST.keys).toEqual(['k']);

      expect(SHORTCUTS.LIKE_POST).toBeDefined();
      expect(SHORTCUTS.LIKE_POST.keys).toEqual(['l']);

      expect(SHORTCUTS.COMMENT_POST).toBeDefined();
      expect(SHORTCUTS.COMMENT_POST.keys).toEqual(['c']);
    });

    it('should have description and category for every shortcut', () => {
      Object.values(SHORTCUTS).forEach(shortcut => {
        expect(shortcut.description).toBeDefined();
        expect(shortcut.description.length).toBeGreaterThan(0);
        expect(shortcut.category).toBeDefined();
        expect(shortcut.keys).toBeDefined();
        expect(shortcut.keys.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getShortcutsByCategory', () => {
    it('should return shortcuts grouped by category', () => {
      const grouped = getShortcutsByCategory();
      expect(grouped).toHaveProperty('Navigation');
      expect(grouped).toHaveProperty('Actions');
      expect(grouped).toHaveProperty('Feed');
    });

    it('should have navigation shortcuts in the Navigation category', () => {
      const grouped = getShortcutsByCategory();
      expect(grouped.Navigation.length).toBeGreaterThan(0);
      grouped.Navigation.forEach(shortcut => {
        expect(shortcut.category).toBe('Navigation');
      });
    });

    it('should have action shortcuts in the Actions category', () => {
      const grouped = getShortcutsByCategory();
      expect(grouped.Actions.length).toBeGreaterThan(0);
      grouped.Actions.forEach(shortcut => {
        expect(shortcut.category).toBe('Actions');
      });
    });

    it('should have feed shortcuts in the Feed category', () => {
      const grouped = getShortcutsByCategory();
      expect(grouped.Feed.length).toBeGreaterThan(0);
      grouped.Feed.forEach(shortcut => {
        expect(shortcut.category).toBe('Feed');
      });
    });

    it('should include all defined shortcuts', () => {
      const grouped = getShortcutsByCategory();
      const totalGrouped = Object.values(grouped).flat().length;
      const totalDefined = Object.values(SHORTCUTS).length;
      expect(totalGrouped).toBe(totalDefined);
    });
  });
});

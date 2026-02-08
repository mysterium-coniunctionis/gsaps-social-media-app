import { SHORTCUTS, getShortcutsByCategory } from './useKeyboardShortcuts';

describe('useKeyboardShortcuts', () => {
  describe('SHORTCUTS configuration', () => {
    it('defines navigation shortcuts with g prefix', () => {
      expect(SHORTCUTS.GO_HOME.keys).toEqual(['g', 'h']);
      expect(SHORTCUTS.GO_FEED.keys).toEqual(['g', 'f']);
      expect(SHORTCUTS.GO_MESSAGES.keys).toEqual(['g', 'm']);
      expect(SHORTCUTS.GO_GROUPS.keys).toEqual(['g', 'g']);
      expect(SHORTCUTS.GO_EVENTS.keys).toEqual(['g', 'e']);
      expect(SHORTCUTS.GO_LIBRARY.keys).toEqual(['g', 'l']);
      expect(SHORTCUTS.GO_COURSES.keys).toEqual(['g', 'c']);
      expect(SHORTCUTS.GO_SETTINGS.keys).toEqual(['g', 's']);
    });

    it('defines action shortcuts', () => {
      expect(SHORTCUTS.NEW_POST.keys).toEqual(['n']);
      expect(SHORTCUTS.SEARCH.keys).toEqual(['/']);
      expect(SHORTCUTS.HELP.keys).toEqual(['?']);
      expect(SHORTCUTS.ESCAPE.keys).toEqual(['Escape']);
    });

    it('defines feed navigation shortcuts', () => {
      expect(SHORTCUTS.NEXT_POST.keys).toEqual(['j']);
      expect(SHORTCUTS.PREV_POST.keys).toEqual(['k']);
      expect(SHORTCUTS.LIKE_POST.keys).toEqual(['l']);
      expect(SHORTCUTS.COMMENT_POST.keys).toEqual(['c']);
    });

    it('every shortcut has a description and category', () => {
      Object.values(SHORTCUTS).forEach(shortcut => {
        expect(shortcut.description).toBeDefined();
        expect(typeof shortcut.description).toBe('string');
        expect(shortcut.category).toBeDefined();
        expect(typeof shortcut.category).toBe('string');
      });
    });

    it('every shortcut has at least one key', () => {
      Object.values(SHORTCUTS).forEach(shortcut => {
        expect(shortcut.keys.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getShortcutsByCategory', () => {
    it('groups shortcuts by category', () => {
      const categories = getShortcutsByCategory();

      expect(categories).toHaveProperty('Navigation');
      expect(categories).toHaveProperty('Actions');
      expect(categories).toHaveProperty('Feed');
    });

    it('places all navigation shortcuts in Navigation category', () => {
      const categories = getShortcutsByCategory();
      const navShortcuts = categories.Navigation;

      expect(navShortcuts.length).toBe(8);
      navShortcuts.forEach(shortcut => {
        expect(shortcut.category).toBe('Navigation');
      });
    });

    it('places all action shortcuts in Actions category', () => {
      const categories = getShortcutsByCategory();
      const actionShortcuts = categories.Actions;

      expect(actionShortcuts.length).toBe(4);
      actionShortcuts.forEach(shortcut => {
        expect(shortcut.category).toBe('Actions');
      });
    });

    it('places all feed shortcuts in Feed category', () => {
      const categories = getShortcutsByCategory();
      const feedShortcuts = categories.Feed;

      expect(feedShortcuts.length).toBe(4);
      feedShortcuts.forEach(shortcut => {
        expect(shortcut.category).toBe('Feed');
      });
    });

    it('includes description for all shortcuts', () => {
      const categories = getShortcutsByCategory();
      Object.values(categories).forEach(shortcuts => {
        shortcuts.forEach(shortcut => {
          expect(shortcut.description).toBeTruthy();
        });
      });
    });
  });
});

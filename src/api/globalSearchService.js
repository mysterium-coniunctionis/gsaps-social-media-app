/**
 * Unified Global Search Service
 * Searches across all content types: posts, papers, courses, users, voice rooms, virtual spaces
 */

import { mockPosts } from '../data/feed/mockPosts';
import { researchPapersData } from '../data/researchPapersData';
import { coursesData } from '../data/coursesData';
import { voiceRoomsData } from '../data/voiceRoomsData';
import { virtualSpacesData } from '../data/virtualSpacesData';
import { networkData } from '../data/networkData';

// Simulated delay for realistic UX
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Content types for search filtering
 */
export const CONTENT_TYPES = {
  ALL: 'all',
  POSTS: 'posts',
  PAPERS: 'papers',
  COURSES: 'courses',
  USERS: 'users',
  VOICE_ROOMS: 'voice_rooms',
  VIRTUAL_SPACES: 'virtual_spaces',
  EVENTS: 'events'
};

/**
 * Search result structure
 */
const createSearchResult = (type, id, title, description, url, metadata = {}) => ({
  type,
  id,
  title,
  description,
  url,
  metadata,
  relevanceScore: 0
});

/**
 * Calculate relevance score based on query match
 */
const calculateRelevance = (text, query) => {
  if (!text || !query) return 0;

  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(Boolean);

  let score = 0;

  // Exact match bonus
  if (textLower.includes(queryLower)) {
    score += 100;
  }

  // Word match scoring
  queryWords.forEach(word => {
    if (textLower.includes(word)) {
      score += 20;
      // Title match bonus
      if (text === title) score += 30;
    }
  });

  // Start-of-text bonus
  if (textLower.startsWith(queryLower)) {
    score += 50;
  }

  return score;
};

/**
 * Search posts
 */
const searchPosts = async (query) => {
  const posts = mockPosts || [];

  return posts
    .filter(post => {
      const searchText = `${post.content || ''} ${post.author?.name || ''} ${(post.tags || []).join(' ')}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    })
    .map(post => {
      const result = createSearchResult(
        CONTENT_TYPES.POSTS,
        post.id,
        post.author?.name ? `Post by ${post.author.name}` : 'Post',
        post.content?.substring(0, 150) + '...',
        `/feed#${post.id}`,
        {
          author: post.author,
          reactions: post.reactions?.length || 0,
          comments: post.comments?.length || 0,
          createdAt: post.createdAt,
          tags: post.tags
        }
      );
      result.relevanceScore = calculateRelevance(post.content, query);
      return result;
    });
};

/**
 * Search research papers
 */
const searchPapers = async (query) => {
  const papers = researchPapersData || [];

  return papers
    .filter(paper => {
      const searchText = `${paper.title || ''} ${paper.abstract || ''} ${(paper.authors || []).map(a => a.name).join(' ')} ${(paper.keywords || []).join(' ')}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    })
    .map(paper => {
      const result = createSearchResult(
        CONTENT_TYPES.PAPERS,
        paper.id,
        paper.title,
        paper.abstract?.substring(0, 150) + '...',
        `/library/${paper.id}`,
        {
          authors: paper.authors,
          journal: paper.journal,
          year: paper.year,
          citations: paper.citations,
          rating: paper.rating
        }
      );
      result.relevanceScore = calculateRelevance(paper.title, query) + calculateRelevance(paper.abstract, query) * 0.5;
      return result;
    });
};

/**
 * Search courses
 */
const searchCourses = async (query) => {
  const courses = coursesData || [];

  return courses
    .filter(course => {
      const searchText = `${course.title || ''} ${course.description || ''} ${course.instructor?.name || ''} ${(course.topics || []).join(' ')}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    })
    .map(course => {
      const result = createSearchResult(
        CONTENT_TYPES.COURSES,
        course.id,
        course.title,
        course.description?.substring(0, 150) + '...',
        `/courses/${course.id}`,
        {
          instructor: course.instructor,
          duration: course.duration,
          level: course.level,
          enrolled: course.enrolled,
          rating: course.rating
        }
      );
      result.relevanceScore = calculateRelevance(course.title, query);
      return result;
    });
};

/**
 * Search users/professionals
 */
const searchUsers = async (query) => {
  const users = networkData?.professionals || [];

  return users
    .filter(user => {
      const searchText = `${user.name || ''} ${user.title || ''} ${user.institution || ''} ${(user.expertise || []).join(' ')} ${user.bio || ''}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    })
    .map(user => {
      const result = createSearchResult(
        CONTENT_TYPES.USERS,
        user.id,
        user.name,
        `${user.title} at ${user.institution}`,
        `/profile/${user.id}`,
        {
          avatar: user.avatar,
          title: user.title,
          institution: user.institution,
          expertise: user.expertise,
          experienceLevel: user.experienceLevel
        }
      );
      result.relevanceScore = calculateRelevance(user.name, query) + calculateRelevance(user.title, query) * 0.5;
      return result;
    });
};

/**
 * Search voice rooms
 */
const searchVoiceRooms = async (query) => {
  const rooms = voiceRoomsData?.rooms || [];

  return rooms
    .filter(room => {
      const searchText = `${room.title || ''} ${room.description || ''} ${room.category || ''} ${(room.tags || []).join(' ')}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    })
    .map(room => {
      const result = createSearchResult(
        CONTENT_TYPES.VOICE_ROOMS,
        room.id,
        room.title,
        room.description?.substring(0, 150) + '...',
        `/voice-rooms/${room.id}`,
        {
          category: room.category,
          status: room.status,
          speakers: room.speakers,
          listenerCount: room.listenerCount,
          isLive: room.status === 'live'
        }
      );
      result.relevanceScore = calculateRelevance(room.title, query);
      return result;
    });
};

/**
 * Search virtual spaces
 */
const searchVirtualSpaces = async (query) => {
  const spaces = virtualSpacesData?.spaces || [];

  return spaces
    .filter(space => {
      const searchText = `${space.name || ''} ${space.description || ''} ${space.type || ''} ${(space.features || []).join(' ')}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    })
    .map(space => {
      const result = createSearchResult(
        CONTENT_TYPES.VIRTUAL_SPACES,
        space.id,
        space.name,
        space.description?.substring(0, 150) + '...',
        `/virtual-space/${space.id}`,
        {
          type: space.type,
          capacity: space.capacity,
          currentOccupancy: space.currentOccupancy,
          thumbnail: space.thumbnail
        }
      );
      result.relevanceScore = calculateRelevance(space.name, query);
      return result;
    });
};

/**
 * Main global search function
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @param {string} options.type - Content type filter (default: 'all')
 * @param {number} options.limit - Max results per type (default: 10)
 * @param {boolean} options.includeMetadata - Include full metadata (default: true)
 * @returns {Promise<object>} - Search results grouped by type
 */
export const globalSearch = async (query, options = {}) => {
  const {
    type = CONTENT_TYPES.ALL,
    limit = 10,
    includeMetadata = true
  } = options;

  if (!query || query.trim().length < 2) {
    return {
      query: '',
      totalResults: 0,
      results: {},
      suggestions: []
    };
  }

  await delay(200); // Simulate network delay

  const searchFunctions = {
    [CONTENT_TYPES.POSTS]: searchPosts,
    [CONTENT_TYPES.PAPERS]: searchPapers,
    [CONTENT_TYPES.COURSES]: searchCourses,
    [CONTENT_TYPES.USERS]: searchUsers,
    [CONTENT_TYPES.VOICE_ROOMS]: searchVoiceRooms,
    [CONTENT_TYPES.VIRTUAL_SPACES]: searchVirtualSpaces
  };

  let results = {};
  let totalResults = 0;

  if (type === CONTENT_TYPES.ALL) {
    // Search all content types in parallel
    const searches = Object.entries(searchFunctions).map(async ([contentType, searchFn]) => {
      const typeResults = await searchFn(query);
      return { contentType, results: typeResults };
    });

    const allResults = await Promise.all(searches);

    allResults.forEach(({ contentType, results: typeResults }) => {
      const sortedResults = typeResults
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, limit);

      results[contentType] = sortedResults;
      totalResults += sortedResults.length;
    });
  } else {
    // Search specific content type
    const searchFn = searchFunctions[type];
    if (searchFn) {
      const typeResults = await searchFn(query);
      results[type] = typeResults
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, limit);
      totalResults = results[type].length;
    }
  }

  // Generate suggestions based on results
  const suggestions = generateSuggestions(query, results);

  return {
    query,
    totalResults,
    results,
    suggestions,
    timestamp: new Date().toISOString()
  };
};

/**
 * Generate search suggestions based on results
 */
const generateSuggestions = (query, results) => {
  const suggestions = [];

  // Suggest related searches based on found content
  Object.values(results).flat().forEach(result => {
    if (result.metadata?.tags) {
      result.metadata.tags.forEach(tag => {
        if (!suggestions.includes(tag) && tag.toLowerCase() !== query.toLowerCase()) {
          suggestions.push(tag);
        }
      });
    }
    if (result.metadata?.expertise) {
      result.metadata.expertise.forEach(exp => {
        if (!suggestions.includes(exp) && exp.toLowerCase() !== query.toLowerCase()) {
          suggestions.push(exp);
        }
      });
    }
  });

  return suggestions.slice(0, 5);
};

/**
 * Quick search - Returns top results across all types
 * @param {string} query - Search query
 * @param {number} limit - Max total results (default: 5)
 */
export const quickSearch = async (query, limit = 5) => {
  const results = await globalSearch(query, { limit: 3 });

  // Flatten and sort all results by relevance
  const allResults = Object.values(results.results)
    .flat()
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);

  return {
    query,
    results: allResults,
    totalResults: allResults.length
  };
};

/**
 * Get trending searches
 */
export const getTrendingSearches = async () => {
  await delay(100);

  return [
    { query: 'psilocybin therapy', count: 1250 },
    { query: 'MDMA PTSD', count: 980 },
    { query: 'neuroplasticity', count: 875 },
    { query: 'integration practices', count: 720 },
    { query: 'ketamine depression', count: 650 },
    { query: 'microdosing research', count: 580 },
    { query: 'set and setting', count: 510 },
    { query: 'psychedelic safety', count: 480 }
  ];
};

/**
 * Get recent searches for user (from localStorage)
 */
export const getRecentSearches = () => {
  try {
    const saved = localStorage.getItem('globalSearch_recent');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

/**
 * Save search to recent searches
 */
export const saveRecentSearch = (query) => {
  try {
    const recent = getRecentSearches();
    const updated = [query, ...recent.filter(q => q !== query)].slice(0, 10);
    localStorage.setItem('globalSearch_recent', JSON.stringify(updated));
  } catch {
    // Silently fail if localStorage is unavailable
  }
};

/**
 * Clear recent searches
 */
export const clearRecentSearches = () => {
  localStorage.removeItem('globalSearch_recent');
};

export default {
  globalSearch,
  quickSearch,
  getTrendingSearches,
  getRecentSearches,
  saveRecentSearch,
  clearRecentSearches,
  CONTENT_TYPES
};

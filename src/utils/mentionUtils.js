/**
 * Utility functions for mention handling
 */

/**
 * Find the @ symbol before the cursor position.
 * Searches backwards from the cursor until an @ is found, but stops if a space or newline is encountered first.
 * @param {string} text - The text content
 * @param {number} cursor - Cursor position
 * @returns {number} Index of @ symbol, or -1 if not found or if a space/newline is encountered first
 */
export const findMentionStart = (text, cursor) => {
  for (let i = cursor - 1; i >= 0; i--) {
    if (text[i] === '@') {
      return i;
    }
    if (text[i] === ' ' || text[i] === '\n') {
      break;
    }
  }
  return -1;
};

/**
 * Extract the mention query after @ symbol
 * @param {string} text - The text content
 * @param {number} atIndex - Index of @ symbol
 * @param {number} cursor - Cursor position
 * @returns {string} Query string after @ (lowercased for matching)
 */
export const extractMentionQuery = (text, atIndex, cursor) => {
  return text.substring(atIndex + 1, cursor).toLowerCase();
};

/**
 * Filter users based on mention query
 * @param {Array} users - Array of user objects with name and username
 * @param {string} query - Search query (will be lowercased)
 * @returns {Array} Filtered users
 */
export const filterUsersForMention = (users, query) => {
  const lowerQuery = query.toLowerCase();
  return users.filter(user =>
    user.name.toLowerCase().includes(lowerQuery) ||
    user.username.toLowerCase().includes(lowerQuery)
  );
};

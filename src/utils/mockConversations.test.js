import { mockConversations, getMockConversationById, getMockMessages } from './mockConversations';

describe('mockConversations', () => {
  describe('mockConversations data', () => {
    it('should export an array of conversations', () => {
      expect(Array.isArray(mockConversations)).toBe(true);
      expect(mockConversations.length).toBeGreaterThan(0);
    });

    it('should have proper conversation structure', () => {
      const conversation = mockConversations[0];
      expect(conversation).toHaveProperty('id');
      expect(conversation).toHaveProperty('participant');
      expect(conversation).toHaveProperty('lastMessage');
      expect(conversation).toHaveProperty('unreadCount');
    });

    it('should have proper participant structure', () => {
      const participant = mockConversations[0].participant;
      expect(participant).toHaveProperty('id');
      expect(participant).toHaveProperty('name');
      expect(participant).toHaveProperty('username');
      expect(participant).toHaveProperty('avatar_url');
    });

    it('should have proper lastMessage structure', () => {
      const lastMessage = mockConversations[0].lastMessage;
      expect(lastMessage).toHaveProperty('text');
      expect(lastMessage).toHaveProperty('timestamp');
      expect(lastMessage).toHaveProperty('senderId');
      expect(lastMessage).toHaveProperty('read');
    });
  });

  describe('getMockConversationById', () => {
    it('should return conversation by id', () => {
      const conversation = getMockConversationById(1);
      expect(conversation).toBeDefined();
      expect(conversation.id).toBe(1);
    });

    it('should return undefined for non-existent id', () => {
      const conversation = getMockConversationById(999);
      expect(conversation).toBeUndefined();
    });

    it('should parse string ids to integers', () => {
      const conversation = getMockConversationById('2');
      expect(conversation).toBeDefined();
      expect(conversation.id).toBe(2);
    });
  });

  describe('getMockMessages', () => {
    it('should return array of messages for valid conversation', () => {
      const conversation = getMockConversationById(1);
      const messages = getMockMessages(conversation);
      expect(Array.isArray(messages)).toBe(true);
      expect(messages.length).toBeGreaterThan(0);
    });

    it('should return empty array for null conversation', () => {
      const messages = getMockMessages(null);
      expect(messages).toEqual([]);
    });

    it('should have proper message structure', () => {
      const conversation = getMockConversationById(1);
      const messages = getMockMessages(conversation);
      const message = messages[0];
      expect(message).toHaveProperty('id');
      expect(message).toHaveProperty('senderId');
      expect(message).toHaveProperty('text');
      expect(message).toHaveProperty('timestamp');
      expect(message).toHaveProperty('read');
    });

    it('should include messages from the conversation participant', () => {
      const conversation = getMockConversationById(1);
      const messages = getMockMessages(conversation);
      const hasParticipantMessages = messages.some(
        msg => msg.senderId === conversation.participant.id
      );
      expect(hasParticipantMessages).toBe(true);
    });
  });
});

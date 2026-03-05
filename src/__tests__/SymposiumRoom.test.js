import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SymposiumRoom from '../pages/workspaces/SymposiumRoom';

// Mock aiService - mock the runAINotetaker function that the component actually uses
jest.mock('../api/aiService', () => ({
  runAINotetaker: jest.fn(() => Promise.resolve({
    summary: 'summary placeholder',
    actions: ['Action item'],
    citations: [{ id: 'ai-cit', title: 'Citation', doi: '10.fake/doi' }]
  })),
  generateSummary: jest.fn(() => Promise.resolve('summary placeholder')),
  actionItems: jest.fn(() => Promise.resolve(['Action item'])),
  citationSuggestions: jest.fn(() => Promise.resolve([{ id: 'ai-cit', title: 'Citation', doi: '10.fake/doi' }]))
}));

jest.mock('marked', () => ({
  marked: { parse: jest.fn(() => '') }
}));

jest.mock('../api/symposiumClient', () => ({
  useSymposiumChannel: jest.fn()
}));

describe('SymposiumRoom', () => {
  const mockUseSymposiumChannel = require('../api/symposiumClient').useSymposiumChannel;

  beforeEach(() => {
    mockUseSymposiumChannel.mockReturnValue({
      agenda: [
        { id: 'ag-1', title: 'Opening', owner: 'Host', time: '09:00' }
      ],
      speakerQueue: [
        { id: 'sp-1', name: 'Dr. Lee', status: 'backstage' }
      ],
      notes: [
        { id: 'note-1', author: 'Host', body: 'Kickoff note', timestamp: '09:05' }
      ],
      polls: [
        {
          id: 'poll-1',
          question: 'Ready to start?',
          options: [
            { id: 'opt-1', label: 'Yes', votes: 1 },
            { id: 'opt-2', label: 'Need a minute', votes: 0 }
          ]
        }
      ],
      chat: [],
      presence: {},
      stageReactions: [],
      addAgendaItem: jest.fn(),
      enqueueSpeaker: jest.fn(),
      addNote: jest.fn(),
      castPollVote: jest.fn(),
      sendChatMessage: jest.fn(),
      sendStageReaction: jest.fn(),
      updatePresenceStatus: jest.fn(),
      setDraft: jest.fn(),
      isConnected: true,
      lastEvent: null
    });
  });

  it('renders agenda, speaker queue, and roster panels', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/symposia/symp-001' }]}>
        <Routes>
          <Route path="/symposia/:roomId" element={<SymposiumRoom />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Live Symposia/i)).toBeInTheDocument();
    expect(screen.getByText(/Opening/)).toBeInTheDocument();
    expect(screen.getByText(/Speaker queue/)).toBeInTheDocument();
    expect(screen.getByText(/Attendee roster/)).toBeInTheDocument();
    expect(await screen.findByText(/AI Notetaker/)).toBeInTheDocument();
  });

  it('shows AI notetaker summary after notes are present', async () => {
    const aiService = require('../api/aiService');
    aiService.runAINotetaker.mockResolvedValue({
      summary: 'Live symposium summary',
      actions: ['Follow up'],
      citations: [{ id: 'c1', title: 'Paper', doi: '10.1/doi' }]
    });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/symposia/symp-001' }]}>
        <Routes>
          <Route path="/symposia/:roomId" element={<SymposiumRoom />} />
        </Routes>
      </MemoryRouter>
    );

    // Find and click the Refresh button
    const refreshButton = await screen.findByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);

    // Wait for the mocked content to appear
    await waitFor(() => {
      expect(screen.getByText(/Live symposium summary/)).toBeInTheDocument();
    });

    expect(screen.getByText(/Follow up/)).toBeInTheDocument();
    expect(screen.getByText(/10.1\/doi/)).toBeInTheDocument();
  });
});

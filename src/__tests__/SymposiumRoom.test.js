import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SymposiumRoom from '../pages/workspaces/SymposiumRoom';

jest.mock('marked', () => ({
  __esModule: true,
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
      canvas: 'Seeded canvas',
      presence: {},
      stageReactions: [],
      addAgendaItem: jest.fn(),
      enqueueSpeaker: jest.fn(),
      addNote: jest.fn(),
      castPollVote: jest.fn(),
      sendChatMessage: jest.fn(),
      sendStageReaction: jest.fn(),
      updateCanvasDraft: jest.fn(),
      updatePresenceStatus: jest.fn(),
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
    await waitFor(() => expect(screen.getByText(/AI Notetaker/)).toBeInTheDocument());
  });

  it('shows AI notetaker summary after notes are present', async () => {
    const { generateSummary, actionItems, citationSuggestions } = jest.requireMock('../api/aiService');
    generateSummary.mockResolvedValue('Live symposium summary');
    actionItems.mockResolvedValue(['Follow up']);
    citationSuggestions.mockResolvedValue([{ id: 'c1', title: 'Paper', doi: '10.1/doi' }]);

    render(
      <MemoryRouter initialEntries={[{ pathname: '/symposia/symp-001' }]}>
        <Routes>
          <Route path="/symposia/:roomId" element={<SymposiumRoom />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Refresh/));

    expect(await screen.findByText(/Live symposium summary/)).toBeInTheDocument();
    expect(screen.getByText(/Follow up/)).toBeInTheDocument();
    expect(screen.getByText(/10.1\/doi/)).toBeInTheDocument();
  });

  it('publishes canvas updates and marks presence as editing', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/symposia/symp-001' }]}>
        <Routes>
          <Route path="/symposia/:roomId" element={<SymposiumRoom />} />
        </Routes>
      </MemoryRouter>
    );

    const textArea = screen.getByLabelText(/Live protocol/i);
    fireEvent.change(textArea, { target: { value: 'Updated canvas' } });

    const channel = require('../api/symposiumClient').useSymposiumChannel;
    expect(channel().updateCanvasDraft).toHaveBeenCalledWith('Updated canvas');
    expect(channel().updatePresenceStatus).toHaveBeenCalledWith('editing');
  });
});

jest.mock('../api/aiService', () => ({
  generateSummary: jest.fn(() => Promise.resolve('summary placeholder')),
  actionItems: jest.fn(() => Promise.resolve(['Action item'])),
  citationSuggestions: jest.fn(() => Promise.resolve([{ id: 'ai-cit', title: 'Citation', doi: '10.fake/doi' }]))
}));

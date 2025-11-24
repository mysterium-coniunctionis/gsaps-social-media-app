import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';
import { findSymposiumById } from '../data/symposiumData';

const buildEventName = (roomId, event) => `symposium:${roomId}:${event}`;

const normalizeOptionVotes = (options = []) =>
  options.map((opt) => ({ ...opt, votes: typeof opt.votes === 'number' ? opt.votes : 0 }));

export const useSymposiumChannel = (roomId) => {
  const fallback = useMemo(() => findSymposiumById(roomId), [roomId]);
  const { subscribeToChannel, emitWithAck, presenceByRoom, updatePresence, isConnected } = useRealtime();
  const [agenda, setAgenda] = useState(fallback.agenda || []);
  const [speakerQueue, setSpeakerQueue] = useState(fallback.speakerQueue || []);
  const [notes, setNotes] = useState(fallback.notes || []);
  const [polls, setPolls] = useState(fallback.polls || []);
  const [chat, setChat] = useState(fallback.chat || []);
  const [canvas, setCanvas] = useState(
    fallback.protocolDraft || '# Shared protocol canvas\n\nCapture safety, dosing, and integration decisions in real time.'
  );
  const [stageReactions, setStageReactions] = useState([]);
  const [presence, setPresence] = useState(
    (fallback.attendees || []).reduce((acc, attendee) => {
      acc[attendee.id] = attendee.status || 'online';
      return acc;
    }, {})
  );
  const [lastEvent, setLastEvent] = useState(null);

  useEffect(() => {
    if (presenceByRoom?.[roomId]) {
      setPresence((prev) => ({ ...prev, ...presenceByRoom[roomId] }));
    }
  }, [presenceByRoom, roomId]);

  useEffect(() => {
    const channel = `symposium:${roomId}`;

    const handlers = {
      'agenda:update': (item) => {
        setAgenda((prev) => {
          const exists = prev.find((ag) => ag.id === item.id);
          return exists ? prev.map((ag) => (ag.id === item.id ? { ...ag, ...item } : ag)) : [...prev, item];
        });
        setLastEvent({ type: 'agenda', payload: item });
      },
      'queue:update': (queue) => {
        setSpeakerQueue(queue);
        setLastEvent({ type: 'queue', payload: queue });
      },
      'notes:append': (incoming) => {
        setNotes((prev) => [...prev, incoming]);
        setLastEvent({ type: 'note', payload: incoming });
      },
      'polls:update': (incomingPoll) => {
        setPolls((prev) => {
          const normalized = { ...incomingPoll, options: normalizeOptionVotes(incomingPoll.options) };
          const exists = prev.find((poll) => poll.id === normalized.id);
          return exists ? prev.map((poll) => (poll.id === normalized.id ? normalized : poll)) : [...prev, normalized];
        });
        setLastEvent({ type: 'poll', payload: incomingPoll });
      },
      'chat:new': (message) => {
        setChat((prev) => [...prev, message].slice(-50));
        setLastEvent({ type: 'chat', payload: message });
      },
      'stage:reaction': (reaction) => {
        setStageReactions((prev) => [reaction, ...prev].slice(0, 40));
        setLastEvent({ type: 'reaction', payload: reaction });
      },
      'presence:update': (incoming) => {
        setPresence((prev) => ({ ...prev, ...incoming }));
      },
      'canvas:update': (incomingCanvas) => {
        setCanvas(incomingCanvas.content);
        setLastEvent({ type: 'canvas', payload: incomingCanvas });
      }
    };

    const cleanup = subscribeToChannel(channel, handlers, { roomId });
    return cleanup;
  }, [roomId, subscribeToChannel]);

  const publish = useCallback(
    (event, payload) => {
      const eventName = buildEventName(roomId, event);
      setLastEvent({ type: event, payload });
      emitWithAck(eventName, payload, {
        onSuccess: () => setLastEvent({ type: event, payload }),
        onError: () => setLastEvent({ type: `${event}:error`, payload })
      });
    },
    [emitWithAck, roomId]
  );

  const addAgendaItem = useCallback(
    (item) => {
      const enriched = { ...item, id: item.id || `ag-${Date.now()}` };
      setAgenda((prev) => {
        const next = [...prev, enriched];
        publish('agenda:update', enriched);
        return next;
      });
    },
    [publish]
  );

  const enqueueSpeaker = useCallback(
    (speaker) => {
      const enriched = { ...speaker, id: speaker.id || `sq-${Date.now()}` };
      setSpeakerQueue((prev) => {
        const next = [...prev, enriched];
        publish('queue:update', next);
        return next;
      });
    },
    [publish]
  );

  const addNote = useCallback(
    (note) => {
      const enriched = {
        ...note,
        id: note.id || `note-${Date.now()}`,
        timestamp: note.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setNotes((prev) => [...prev, enriched]);
      publish('notes:append', enriched);
    },
    [publish]
  );

  const castPollVote = useCallback(
    (pollId, optionId) => {
      setPolls((prev) => {
        const next = prev.map((poll) =>
          poll.id === pollId
            ? {
                ...poll,
                options: poll.options.map((opt) =>
                  opt.id === optionId ? { ...opt, votes: (opt.votes || 0) + 1 } : opt
                )
              }
            : poll
        );
        const changed = next.find((poll) => poll.id === pollId);
        if (changed) {
          publish('polls:update', changed);
        }
        return next;
      });
    },
    [publish]
  );

  const sendChatMessage = useCallback(
    (message) => {
      const enriched = {
        id: message.id || `chat-${Date.now()}`,
        ...message,
        optimistic: true
      };
      setChat((prev) => [...prev, enriched].slice(-50));
      publish('chat:new', enriched);
    },
    [publish]
  );

  const sendStageReaction = useCallback(
    (emoji) => {
      const reaction = { id: `rx-${Date.now()}`, emoji, user: 'you', ts: Date.now() };
      setStageReactions((prev) => [reaction, ...prev].slice(0, 40));
      publish('stage:reaction', reaction);
    },
    [publish]
  );

  const updateCanvasDraft = useCallback(
    (content) => {
      const payload = { content, updatedBy: 'you', ts: Date.now() };
      setCanvas(content);
      publish('canvas:update', payload);
    },
    [publish]
  );

  const updatePresenceStatus = useCallback(
    (status = 'online') => {
      const selfId = 'you';
      updatePresence(roomId, status);
      setPresence((prev) => ({ ...prev, [selfId]: status }));
      publish('presence:update', { [selfId]: status });
    },
    [publish, roomId, updatePresence]
  );

  return {
    agenda,
    speakerQueue,
    notes,
    polls,
    chat,
    canvas,
    presence,
    stageReactions,
    isConnected,
    lastEvent,
    addAgendaItem,
    enqueueSpeaker,
    addNote,
    castPollVote,
    sendChatMessage,
    sendStageReaction,
    updateCanvasDraft,
    updatePresenceStatus
  };
};

export const useSymposiumPresence = (roomId) => {
  const { presenceByRoom } = useRealtime();
  return presenceByRoom?.[roomId] || {};
};

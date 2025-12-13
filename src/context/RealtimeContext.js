import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const RealtimeContext = createContext(null);

export const useRealtime = () => useContext(RealtimeContext);

export const RealtimeProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const socketRef = useRef(null);
  const optimisticRef = useRef(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const [typingByRoom, setTypingByRoom] = useState({});
  const [presenceByRoom, setPresenceByRoom] = useState({});
  const [feedUpdates, setFeedUpdates] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Helper to update room-based state (typing/presence) only if value changed
  // This prevents unnecessary re-renders by returning the same object reference
  // when the value hasn't actually changed
  const updateRoomState = useCallback((setState, roomId, userId, value) => {
    setState(prev => {
      const roomData = prev[roomId] || {};
      // Only update if value actually changed
      if (roomData[userId] === value) return prev;
      
      return {
        ...prev,
        [roomId]: {
          ...roomData,
          [userId]: value
        }
      };
    });
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const reconcileOptimisticUpdate = useCallback((tempId, payload, onMissing) => {
    const pending = optimisticRef.current.get(tempId);

    if (pending) {
      pending.onSuccess?.(payload);
      optimisticRef.current.delete(tempId);
      return true;
    }

    if (onMissing) {
      onMissing(payload);
    }

    return false;
  }, []);

  const connect = useCallback(() => {
    if (!currentUser) {
      disconnect();
      return;
    }

    const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000', {
      transports: ['websocket'],
      autoConnect: true,
      auth: {
        token: localStorage.getItem('gsaps_token'),
        userId: currentUser?.id
      }
    });

    socketRef.current = socket;

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('typing', ({ roomId, userId, isTyping }) => {
      if (!roomId || !userId) return;
      updateRoomState(setTypingByRoom, roomId, userId, isTyping);
    });

    socket.on('presence:update', ({ roomId, userId, status }) => {
      if (!roomId || !userId) return;
      updateRoomState(setPresenceByRoom, roomId, userId, status || 'online');
    });

    socket.on('feed:update', (update) => {
      if (!update) return;
      setFeedUpdates(prev => [update, ...prev].slice(0, 50));
    });

    socket.on('notification:new', (notification) => {
      if (!notification) return;
      setNotifications(prev => [notification, ...prev].slice(0, 50));
    });

    socket.on('optimistic:confirm', ({ tempId, payload }) => {
      if (!tempId) return;
      reconcileOptimisticUpdate(tempId, payload);
    });

    socket.on('optimistic:reject', ({ tempId, reason }) => {
      if (!tempId) return;
      const pending = optimisticRef.current.get(tempId);
      pending?.onError?.(new Error(reason || 'Update rejected'));
      optimisticRef.current.delete(tempId);
    });
  }, [currentUser, disconnect, reconcileOptimisticUpdate, updateRoomState]);

  useEffect(() => {
    connect();
    return disconnect;
  }, [connect, disconnect]);

  const emitWithAck = useCallback((event, payload, { optimisticId, onSuccess, onError } = {}) => {
    const socket = socketRef.current;

    if (optimisticId) {
      optimisticRef.current.set(optimisticId, { onSuccess, onError });
    }

    if (!socket || !isConnected) {
      onSuccess?.(payload);
      if (optimisticId) {
        optimisticRef.current.delete(optimisticId);
      }
      return;
    }

    socket.timeout(8000).emit(event, payload, (response = {}) => {
      if (response.error) {
        onError?.(new Error(response.error));
        if (optimisticId) {
          optimisticRef.current.delete(optimisticId);
        }
        return;
      }

      onSuccess?.(response.payload || response);
      if (optimisticId) {
        optimisticRef.current.delete(optimisticId);
      }
    });
  }, [isConnected]);

  const subscribeToChannel = useCallback((channel, handlers = {}, joinPayload = {}) => {
    const socket = socketRef.current;
    if (!socket || !channel) return () => {};

    socket.emit('subscribe', { channel, ...joinPayload });

    Object.entries(handlers).forEach(([event, handler]) => {
      const eventName = `${channel}:${event}`;
      socket.on(eventName, handler);
    });

    return () => {
      socket.emit('unsubscribe', { channel });
      Object.entries(handlers).forEach(([event, handler]) => {
        const eventName = `${channel}:${event}`;
        socket.off(eventName, handler);
      });
    };
  }, []);

  const sendTypingIndicator = useCallback((roomId, isTyping = true) => {
    const socket = socketRef.current;
    const userId = currentUser?.id || 'self';

    if (socket && roomId) {
      socket.emit('typing', { roomId, isTyping });
    }

    updateRoomState(setTypingByRoom, roomId, userId, isTyping);
  }, [currentUser, updateRoomState]);

  const updatePresence = useCallback((roomId, status = 'online') => {
    const socket = socketRef.current;
    const userId = currentUser?.id || 'self';

    if (socket && roomId) {
      socket.emit('presence:update', { roomId, status });
    }

    updateRoomState(setPresenceByRoom, roomId, userId, status);
  }, [currentUser, updateRoomState]);

  const value = useMemo(() => ({
    socket: socketRef.current,
    isConnected,
    typingByRoom,
    presenceByRoom,
    feedUpdates,
    notifications,
    subscribeToChannel,
    emitWithAck,
    sendTypingIndicator,
    updatePresence,
    reconcileOptimisticUpdate
  }), [
    feedUpdates,
    isConnected,
    notifications,
    presenceByRoom,
    typingByRoom,
    subscribeToChannel,
    emitWithAck,
    sendTypingIndicator,
    updatePresence,
    reconcileOptimisticUpdate
  ]);

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtimeSubscription = ({ channel, handlers, enabled = true, joinPayload }) => {
  const { subscribeToChannel } = useRealtime();

  useEffect(() => {
    if (!enabled || !channel) return undefined;

    const cleanup = subscribeToChannel(channel, handlers, joinPayload);
    return () => cleanup?.();
  }, [channel, enabled, handlers, joinPayload, subscribeToChannel]);
};

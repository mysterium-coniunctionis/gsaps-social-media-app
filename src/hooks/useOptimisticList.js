import { useCallback } from 'react';
import { useRealtime } from '../context/RealtimeContext';

export const useOptimisticList = ({ roomId, namespace, setItems }) => {
  const { emitWithAck, reconcileOptimisticUpdate } = useRealtime();

  const addOptimisticItem = useCallback((event, item, { onSuccess, onError } = {}) => {
    const tempId = item.tempId || `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const optimisticItem = {
      ...item,
      id: tempId,
      optimistic: true,
      status: 'pending',
      tempId
    };

    setItems(prev => [...prev, optimisticItem]);

    emitWithAck(event, { ...item, tempId, roomId, namespace }, {
      optimisticId: tempId,
      onSuccess: (serverItem = {}) => {
        setItems(prev => prev.map(entry => entry.id === tempId ? {
          ...optimisticItem,
          ...serverItem,
          id: serverItem.id || tempId,
          optimistic: false,
          status: 'confirmed'
        } : entry));
        onSuccess?.(serverItem);
      },
      onError: (err) => {
        setItems(prev => prev.filter(entry => entry.id !== tempId));
        onError?.(err);
      }
    });

    return tempId;
  }, [emitWithAck, namespace, roomId, setItems]);

  const confirmFromServer = useCallback((incoming) => {
    if (!incoming) return;

    const { tempId } = incoming;
    if (tempId) {
      reconcileOptimisticUpdate(tempId, incoming);
    }

    setItems(prev => {
      const tempMatch = tempId && prev.find(item => item.id === tempId);
      if (tempMatch) {
        return prev.map(item => item.id === tempId ? {
          ...item,
          ...incoming,
          id: incoming.id || tempId,
          optimistic: false,
          status: 'confirmed'
        } : item);
      }

      const idMatch = incoming.id && prev.find(item => item.id === incoming.id);
      if (idMatch) {
        return prev.map(item => item.id === incoming.id ? { ...item, ...incoming, optimistic: false, status: 'confirmed' } : item);
      }

      return [...prev, { ...incoming, optimistic: false, status: 'confirmed' }];
    });
  }, [reconcileOptimisticUpdate, setItems]);

  const removeOptimistic = useCallback((tempId) => {
    if (!tempId) return;
    setItems(prev => prev.filter(item => item.id !== tempId));
  }, [setItems]);

  return {
    addOptimisticItem,
    confirmFromServer,
    removeOptimistic
  };
};

export default useOptimisticList;

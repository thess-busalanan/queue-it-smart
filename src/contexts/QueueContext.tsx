
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { QueueItem, Service, QueueStats } from '@/lib/types';
import { initialQueue, services, getEstimatedWaitTime } from '@/lib/data';
import { toast } from "sonner";

interface QueueContextType {
  queue: QueueItem[];
  services: Service[];
  stats: QueueStats;
  addToQueue: (studentId: string, studentName: string, serviceId: string) => string;
  removeFromQueue: (queueId: string) => void;
  markAsComplete: (queueId: string) => void;
  markAsActive: (queueId: string) => void;
  getEstimatedWaitTime: (position: number, serviceId: string) => number;
  getUserQueueItem: (studentId: string) => QueueItem | undefined;
  getServiceById: (serviceId: string) => Service | undefined;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  
  const calculateStats = (): QueueStats => {
    const waitingItems = queue.filter(item => item.status === 'waiting');
    const activeItem = queue.find(item => item.status === 'active') || null;
    
    return {
      totalWaiting: waitingItems.length,
      averageWaitTime: waitingItems.length > 0 
        ? waitingItems.reduce((acc, item) => {
            const service = services.find(s => s.id === item.serviceId);
            return acc + (service?.estimatedTimeMinutes || 10);
          }, 0) / waitingItems.length
        : 0,
      currentlyServing: activeItem
    };
  };
  
  const [stats, setStats] = useState<QueueStats>(calculateStats());
  
  useEffect(() => {
    setStats(calculateStats());
  }, [queue]);

  const reorderQueue = (updatedQueue: QueueItem[]): QueueItem[] => {
    let position = 1;
    
    return updatedQueue
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(item => {
        if (item.status === 'waiting' || item.status === 'active') {
          const updated = { ...item, position };
          position++;
          return updated;
        }
        return item;
      });
  };

  const addToQueue = (studentId: string, studentName: string, serviceId: string): string => {
    // Check if student is already in queue
    const existingItem = queue.find(
      item => item.studentId === studentId && 
      (item.status === 'waiting' || item.status === 'active')
    );
    
    if (existingItem) {
      toast("Already in queue", {
        description: "You are already in the queue for another service."
      });
      return existingItem.id;
    }
    
    const service = services.find(s => s.id === serviceId);
    
    if (!service) {
      toast("Service not found", {
        description: "The selected service could not be found."
      });
      return '';
    }
    
    const newItem: QueueItem = {
      id: Date.now().toString(),
      studentId,
      studentName,
      serviceId,
      serviceName: service.name,
      timestamp: Date.now(),
      status: 'waiting',
      position: queue.filter(item => 
        item.status === 'waiting' || item.status === 'active'
      ).length + 1
    };
    
    const updatedQueue = [...queue, newItem];
    setQueue(reorderQueue(updatedQueue));
    
    toast("Added to queue", {
      description: `You are now in position ${newItem.position} for ${service.name}.`
    });
    
    return newItem.id;
  };

  const removeFromQueue = (queueId: string) => {
    const itemIndex = queue.findIndex(item => item.id === queueId);
    
    if (itemIndex === -1) return;
    
    const updatedQueue = [...queue];
    updatedQueue[itemIndex] = { ...updatedQueue[itemIndex], status: 'cancelled' as const };
    
    setQueue(reorderQueue(updatedQueue));
    
    toast("Removed from queue", {
      description: "You have been removed from the queue."
    });
  };

  const markAsComplete = (queueId: string) => {
    const itemIndex = queue.findIndex(item => item.id === queueId);
    
    if (itemIndex === -1) return;
    
    const updatedQueue = [...queue];
    updatedQueue[itemIndex] = { ...updatedQueue[itemIndex], status: 'completed' as const };
    
    setQueue(reorderQueue(updatedQueue));
    
    toast("Service completed", {
      description: "The service has been marked as completed."
    });
  };

  const markAsActive = (queueId: string) => {
    // First, mark any currently active items as completed
    const updatedQueue = queue.map(item => 
      item.status === 'active' ? { ...item, status: 'completed' as const } : item
    );
    
    const itemIndex = updatedQueue.findIndex(item => item.id === queueId);
    
    if (itemIndex === -1) return;
    
    updatedQueue[itemIndex] = { ...updatedQueue[itemIndex], status: 'active' as const };
    
    setQueue(reorderQueue(updatedQueue));
    
    toast("Now serving", {
      description: `Now serving ${updatedQueue[itemIndex].studentName}.`
    });
  };

  const getUserQueueItem = (studentId: string): QueueItem | undefined => {
    return queue.find(
      item => item.studentId === studentId && 
      (item.status === 'waiting' || item.status === 'active')
    );
  };

  const getServiceById = (serviceId: string): Service | undefined => {
    return services.find(s => s.id === serviceId);
  };

  return (
    <QueueContext.Provider
      value={{
        queue,
        services,
        stats,
        addToQueue,
        removeFromQueue,
        markAsComplete,
        markAsActive,
        getEstimatedWaitTime,
        getUserQueueItem,
        getServiceById
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};

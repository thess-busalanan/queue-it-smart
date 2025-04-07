
export interface Student {
  id: string;
  name: string;
  studentId: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  estimatedTimeMinutes: number;
  icon: string;
}

export interface QueueItem {
  id: string;
  studentId: string;
  studentName: string;
  serviceId: string;
  serviceName: string;
  timestamp: number;
  status: 'waiting' | 'active' | 'completed' | 'cancelled';
  notes?: string;
  position: number;
}

export interface QueueStats {
  totalWaiting: number;
  averageWaitTime: number;
  currentlyServing: QueueItem | null;
}

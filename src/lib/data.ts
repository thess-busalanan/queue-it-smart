
import { Service, QueueItem } from './types';

// Sample services offered
export const services: Service[] = [
  {
    id: '1',
    name: 'Enrollment Assistance',
    description: 'Help with course enrollment, class scheduling, and registration issues.',
    estimatedTimeMinutes: 15,
    icon: 'clipboard-list'
  },
  {
    id: '2',
    name: 'Document Request',
    description: 'Request for transcripts, certificates, and other official documents.',
    estimatedTimeMinutes: 10,
    icon: 'file-text'
  },
  {
    id: '3',
    name: 'ID Replacement',
    description: 'Assistance with replacing lost or damaged student ID cards.',
    estimatedTimeMinutes: 8,
    icon: 'id-card'
  },
  {
    id: '4',
    name: 'Financial Assistance',
    description: 'Inquiries about scholarships, grants, and payment plans.',
    estimatedTimeMinutes: 20,
    icon: 'credit-card'
  },
  {
    id: '5',
    name: 'Technical Support',
    description: 'Help with student portal, email, or other technical issues.',
    estimatedTimeMinutes: 12,
    icon: 'laptop'
  }
];

// Initial sample queue
export const initialQueue: QueueItem[] = [
  {
    id: '1',
    studentId: 'S12345',
    studentName: 'Jane Smith',
    serviceId: '2',
    serviceName: 'Document Request',
    timestamp: Date.now() - 1000 * 60 * 15, // 15 minutes ago
    status: 'active',
    position: 1
  },
  {
    id: '2',
    studentId: 'S12346',
    studentName: 'John Doe',
    serviceId: '1',
    serviceName: 'Enrollment Assistance',
    timestamp: Date.now() - 1000 * 60 * 10, // 10 minutes ago
    status: 'waiting',
    position: 2
  },
  {
    id: '3',
    studentId: 'S12347',
    studentName: 'Emily Johnson',
    serviceId: '4',
    serviceName: 'Financial Assistance',
    timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
    status: 'waiting',
    position: 3
  }
];

// Sample user data
export const currentUser = {
  id: 'S12348',
  name: 'Michael Williams',
  studentId: 'S12348',
  isAdmin: false
};

// Get estimated wait time based on position and service type
export const getEstimatedWaitTime = (position: number, serviceId: string): number => {
  const service = services.find(s => s.id === serviceId);
  if (!service) return position * 10; // Default 10 minutes per person
  
  return position * service.estimatedTimeMinutes;
};

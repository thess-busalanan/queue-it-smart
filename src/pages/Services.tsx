
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueue } from '@/contexts/QueueContext';
import { currentUser } from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';
import QueueDisplay from '@/components/QueueDisplay';
import { BookOpen, Clock, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Services = () => {
  const { services, addToQueue, getUserQueueItem, stats } = useQueue();
  const navigate = useNavigate();
  
  const userQueueItem = getUserQueueItem(currentUser.id);
  
  const handleJoinQueue = (serviceId: string) => {
    addToQueue(currentUser.id, currentUser.name, serviceId);
    navigate('/status');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            <span className="text-gradient">Available Services</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a service to join the queue. Our smart system will keep you updated with your position and estimated waiting time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onJoinQueue={handleJoinQueue}
              userInQueue={!!userQueueItem}
            />
          ))}
        </div>
        
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Clock className="mr-2 h-6 w-6 text-queue-primary" />
              Current Queue Status
            </h2>
            
            <div className="flex items-center space-x-2 bg-blue-50 py-2 px-4 rounded-full">
              <User className="h-5 w-5 text-queue-primary" />
              <span className="text-sm font-medium">{stats.totalWaiting} waiting</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm font-medium">{Math.round(stats.averageWaitTime)} min avg wait</span>
            </div>
          </div>
          
          <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
            <QueueDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

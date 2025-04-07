
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueue } from '@/contexts/QueueContext';
import { currentUser } from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';
import QueueDisplay from '@/components/QueueDisplay';

const Services = () => {
  const { services, addToQueue, getUserQueueItem } = useQueue();
  const navigate = useNavigate();
  
  const userQueueItem = getUserQueueItem(currentUser.id);
  
  const handleJoinQueue = (serviceId: string) => {
    addToQueue(currentUser.id, currentUser.name, serviceId);
    navigate('/status');
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Services</h1>
        <p className="text-gray-600">
          Select a service to join the queue. You can only join one queue at a time.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {services.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onJoinQueue={handleJoinQueue}
            userInQueue={!!userQueueItem}
          />
        ))}
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Current Queue</h2>
        <QueueDisplay />
      </div>
    </div>
  );
};

export default Services;

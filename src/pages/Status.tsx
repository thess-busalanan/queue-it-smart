
import React from 'react';
import { Button } from '@/components/ui/button';
import { useQueue } from '@/contexts/QueueContext';
import { currentUser } from '@/lib/data';
import QueueStatus from '@/components/QueueStatus';
import QueueDisplay from '@/components/QueueDisplay';
import { Link, useNavigate } from 'react-router-dom';
import { TicketIcon, AlertCircle } from 'lucide-react';

const Status = () => {
  const { getUserQueueItem, removeFromQueue } = useQueue();
  const navigate = useNavigate();
  
  const userQueueItem = getUserQueueItem(currentUser.id);
  
  const handleCancelQueue = () => {
    if (!userQueueItem) return;
    removeFromQueue(userQueueItem.id);
    navigate('/services');
  };
  
  if (!userQueueItem) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">You're not in any queue</h1>
          <p className="text-gray-600 mb-8">
            You are currently not in any service queue. Join a queue to view your status.
          </p>
          <Link to="/services">
            <Button className="px-6 py-2 bg-queue-primary text-white rounded-md hover:bg-queue-dark">
              Join a Queue
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Queue Status</h1>
        <p className="text-gray-600">
          Track your position in the queue and estimated waiting time.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <QueueStatus 
            userQueueItem={userQueueItem} 
            onCancelQueue={handleCancelQueue} 
          />
          
          <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-start">
              <TicketIcon className="h-6 w-6 text-queue-primary mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">What to do next</h3>
                <p className="text-gray-600 mt-1 text-sm">
                  You can leave the area and return when your position is about to be called. Keep checking this page for updates on your queue status.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <QueueDisplay />
        </div>
      </div>
    </div>
  );
};

export default Status;

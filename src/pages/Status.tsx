
import React from 'react';
import { Button } from '@/components/ui/button';
import { useQueue } from '@/contexts/QueueContext';
import { currentUser } from '@/lib/data';
import QueueStatus from '@/components/QueueStatus';
import QueueDisplay from '@/components/QueueDisplay';
import { Link, useNavigate } from 'react-router-dom';
import { TicketIcon, AlertCircle, ArrowLeftIcon, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Status = () => {
  const { getUserQueueItem, removeFromQueue, getEstimatedWaitTime } = useQueue();
  const navigate = useNavigate();
  
  const userQueueItem = getUserQueueItem(currentUser.id);
  
  const handleCancelQueue = () => {
    if (!userQueueItem) return;
    removeFromQueue(userQueueItem.id);
    navigate('/services');
  };
  
  if (!userQueueItem) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="glass-card text-center py-16 px-8 rounded-2xl">
            <AlertCircle className="h-20 w-20 text-orange-500 mx-auto mb-6 animate-pulse-subtle" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">You're not in any queue</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You are currently not in any service queue. Join a queue to view your status and estimated waiting time.
            </p>
            <Link to="/services">
              <Button className="px-6 py-6 bg-queue-primary text-white rounded-xl hover:bg-queue-dark shadow-lg hover:shadow-xl transition-all">
                <Clock className="mr-2 h-5 w-5" />
                Join a Queue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Calculate progress percentage if user is in queue
  const waitTime = getEstimatedWaitTime(userQueueItem.position - 1, userQueueItem.serviceId);
  const progressValue = userQueueItem.status === 'active' ? 100 : 
    Math.max(5, Math.min(95, 100 - (userQueueItem.position / 5) * 100));
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              <span className="text-gradient">Queue Status</span>
            </h1>
            <p className="text-gray-600">
              Track your position in the queue and estimated waiting time.
            </p>
          </div>
          <Link to="/services">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Services
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <QueueStatus 
              userQueueItem={userQueueItem} 
              onCancelQueue={handleCancelQueue} 
            />
            
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start">
                <TicketIcon className="h-6 w-6 text-queue-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">What to do next</h3>
                  <p className="text-gray-600 mt-1 text-sm">
                    You can leave the area and return when your position is about to be called. Keep checking this page for updates on your queue status.
                  </p>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Queue Progress</span>
                      <span>{userQueueItem.status === 'active' ? 'Now Serving' : `Position ${userQueueItem.position}`}</span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl overflow-hidden shadow-lg animate-fade-in">
            <div className="bg-queue-primary text-white py-3 px-4">
              <h3 className="font-medium flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Current Queue
              </h3>
            </div>
            <QueueDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;

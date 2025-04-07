
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQueue } from '@/contexts/QueueContext';
import { QueueItem } from '@/lib/types';
import { Clock, Users, Check, AlertTriangle } from 'lucide-react';

interface QueueStatusProps {
  userQueueItem: QueueItem;
  onCancelQueue: () => void;
}

const QueueStatus: React.FC<QueueStatusProps> = ({ userQueueItem, onCancelQueue }) => {
  const { getEstimatedWaitTime, stats } = useQueue();
  
  const estimatedWaitMinutes = getEstimatedWaitTime(
    userQueueItem.position - 1, // Subtract 1 because we're already counting the current position
    userQueueItem.serviceId
  );
  
  const getStatusIcon = () => {
    switch (userQueueItem.status) {
      case 'active': return <Check className="h-8 w-8 text-green-500" />;
      case 'waiting': return <Clock className="h-8 w-8 text-queue-primary animate-pulse-subtle" />;
      default: return <AlertTriangle className="h-8 w-8 text-orange-500" />;
    }
  };
  
  const getStatusMessage = () => {
    switch (userQueueItem.status) {
      case 'active': return "You're being served now!";
      case 'waiting': return `Your estimated wait time is ${estimatedWaitMinutes} minutes`;
      default: return "Unknown status";
    }
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Your Queue Status</span>
          {getStatusIcon()}
        </CardTitle>
        <CardDescription>
          {userQueueItem.serviceName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="text-center">
            <div className={`queue-position ${userQueueItem.status === 'active' ? 'queue-position-active' : 'queue-position-waiting'} mx-auto`}>
              {userQueueItem.position}
            </div>
            <p className="queue-label mt-1">Your Position</p>
          </div>
          <div className="text-center">
            <div className="queue-stat text-queue-primary">
              {stats.totalWaiting}
            </div>
            <p className="queue-label">People Waiting</p>
          </div>
        </div>
        
        <div className="mt-4 text-center bg-blue-50 p-3 rounded-md">
          <p className="text-queue-primary font-medium">
            {getStatusMessage()}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={onCancelQueue}
        >
          Leave Queue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QueueStatus;

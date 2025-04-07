
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQueue } from '@/contexts/QueueContext';
import { QueueItem } from '@/lib/types';
import { Clock, Users, Check, AlertTriangle, LogOut } from 'lucide-react';

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
    <Card className="glass-card shadow-lg border-none overflow-hidden">
      <div className={`h-1.5 ${userQueueItem.status === 'active' ? 'bg-green-500' : 'bg-queue-primary'}`} />
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Your Queue Status</CardTitle>
            <CardDescription className="mt-1">
              {userQueueItem.serviceName}
            </CardDescription>
          </div>
          {getStatusIcon()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="text-center bg-blue-50 rounded-lg p-4">
            <div className={`queue-position ${userQueueItem.status === 'active' ? 'queue-position-active' : 'queue-position-waiting'} mx-auto mb-2 h-12 w-12 text-xl`}>
              {userQueueItem.position}
            </div>
            <p className="font-medium text-gray-700">Your Position</p>
          </div>
          <div className="text-center bg-blue-50 rounded-lg p-4">
            <div className="queue-stat text-queue-primary">
              {stats.totalWaiting}
            </div>
            <p className="font-medium text-gray-700">People Waiting</p>
          </div>
        </div>
        
        <div className="mt-6 text-center p-4 rounded-lg border border-blue-100 bg-blue-50">
          <p className={`font-medium ${userQueueItem.status === 'active' ? 'text-green-600' : 'text-queue-primary'}`}>
            {getStatusMessage()}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full text-red-500 hover:text-red-700 hover:bg-red-50 border-red-100 flex items-center justify-center gap-2"
          onClick={onCancelQueue}
        >
          <LogOut className="h-4 w-4" />
          Leave Queue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QueueStatus;

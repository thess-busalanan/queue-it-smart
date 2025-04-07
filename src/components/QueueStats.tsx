
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useQueue } from '@/contexts/QueueContext';
import { Users, Clock, CheckCircle } from 'lucide-react';

const QueueStats: React.FC = () => {
  const { stats, queue } = useQueue();
  
  const completedToday = queue.filter(
    item => item.status === 'completed' && 
    new Date(item.timestamp).toDateString() === new Date().toDateString()
  ).length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100 mr-4">
              <Users className="h-6 w-6 text-queue-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Students Waiting</p>
              <p className="text-2xl font-bold">{stats.totalWaiting}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-amber-100 mr-4">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Wait Time</p>
              <p className="text-2xl font-bold">{Math.round(stats.averageWaitTime)} min</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100 mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Today</p>
              <p className="text-2xl font-bold">{completedToday}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QueueStats;

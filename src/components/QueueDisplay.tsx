
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQueue } from '@/contexts/QueueContext';
import { Clock, User } from 'lucide-react';

const QueueDisplay: React.FC = () => {
  const { queue, stats } = useQueue();
  
  // Get only waiting and active items
  const activeQueue = queue.filter(item => 
    item.status === 'waiting' || item.status === 'active'
  ).slice(0, 5); // Only show first 5 items
  
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Current Queue</span>
          <Badge variant="outline" className="ml-2 bg-blue-50 text-queue-primary">
            {stats.totalWaiting} Waiting
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeQueue.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No students currently in queue</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeQueue.map((item) => (
              <div 
                key={item.id} 
                className={`flex items-center p-3 rounded-lg border ${
                  item.status === 'active' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className={`queue-position ${
                  item.status === 'active' 
                    ? 'queue-position-active' 
                    : 'queue-position-waiting'
                } mr-3`}>
                  {item.position}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.studentName}</div>
                  <div className="text-sm text-gray-500">{item.serviceName}</div>
                </div>
                <div className="text-right">
                  {item.status === 'active' ? (
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                      Now Serving
                    </Badge>
                  ) : (
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{Math.floor((Date.now() - item.timestamp) / 60000)}m</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QueueDisplay;

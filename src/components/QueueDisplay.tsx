
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQueue } from '@/contexts/QueueContext';
import { Clock, User, UserCheck } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const QueueDisplay: React.FC = () => {
  const { queue, stats } = useQueue();
  
  // Get only waiting and active items
  const activeQueue = queue.filter(item => 
    item.status === 'waiting' || item.status === 'active'
  ).slice(0, 5); // Only show first 5 items
  
  return (
    <div>
      <CardContent className="p-0">
        {activeQueue.length === 0 ? (
          <div className="text-center py-12 px-4 text-gray-500">
            <UserCheck className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="font-medium">No students currently in queue</p>
            <p className="text-sm mt-1">The queue is empty at the moment</p>
          </div>
        ) : (
          <ScrollArea className="h-[340px]">
            <div className="p-4 space-y-3">
              {activeQueue.map((item) => (
                <div 
                  key={item.id} 
                  className={`flex items-center p-4 rounded-lg border ${
                    item.status === 'active' 
                      ? 'bg-green-50 border-green-200 animate-fade-in' 
                      : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-colors'
                  }`}
                >
                  <div className={`queue-position ${
                    item.status === 'active' 
                      ? 'queue-position-active' 
                      : 'queue-position-waiting'
                  } mr-4 h-12 w-12 text-xl`}>
                    {item.position}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.studentName}</div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1 inline" />
                      <span>{item.serviceName}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {item.status === 'active' ? (
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 font-medium px-3 py-1">
                        Now Serving
                      </Badge>
                    ) : (
                      <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{Math.floor((Date.now() - item.timestamp) / 60000)}m</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </div>
  );
};

export default QueueDisplay;

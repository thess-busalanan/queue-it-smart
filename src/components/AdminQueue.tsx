
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQueue } from '@/contexts/QueueContext';
import { Check, XCircle, Clock, ArrowRight } from 'lucide-react';

const AdminQueue: React.FC = () => {
  const { queue, markAsActive, markAsComplete, stats } = useQueue();
  
  // Get only waiting and active items
  const activeQueue = queue.filter(item => 
    item.status === 'waiting' || item.status === 'active'
  );
  
  const currentlyServing = activeQueue.find(item => item.status === 'active');
  const waitingItems = activeQueue.filter(item => item.status === 'waiting');
  
  return (
    <div className="space-y-6">
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Currently Serving</CardTitle>
        </CardHeader>
        <CardContent>
          {!currentlyServing ? (
            <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No student currently being served</p>
              {waitingItems.length > 0 && (
                <Button 
                  className="mt-4"
                  onClick={() => markAsActive(waitingItems[0].id)}
                >
                  Call Next Student
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <div className="queue-position-active mr-3">
                    {currentlyServing.position}
                  </div>
                  <div>
                    <div className="font-medium text-lg">{currentlyServing.studentName}</div>
                    <div className="text-sm text-gray-600">
                      ID: {currentlyServing.studentId} • {currentlyServing.serviceName}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800"
                    onClick={() => markAsComplete(currentlyServing.id)}
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Complete
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Serving for {Math.floor((Date.now() - currentlyServing.timestamp) / 60000)} minutes
                </span>
                
                {waitingItems.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => markAsActive(waitingItems[0].id)}
                  >
                    <ArrowRight className="mr-1 h-4 w-4" />
                    Next Student
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center justify-between">
            <span>Waiting List</span>
            <Badge variant="outline" className="ml-2 bg-blue-50 text-queue-primary">
              {stats.totalWaiting} Waiting
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {waitingItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No students currently waiting</p>
            </div>
          ) : (
            <div className="space-y-3">
              {waitingItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center p-3 rounded-lg border border-gray-200"
                >
                  <div className="queue-position-waiting mr-3">
                    {item.position}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.studentName}</div>
                    <div className="text-sm text-gray-500">
                      {item.serviceName} • ID: {item.studentId}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => markAsActive(item.id)}
                    >
                      Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminQueue;

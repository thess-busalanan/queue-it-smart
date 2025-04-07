import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQueue } from '@/contexts/QueueContext';
import { Check, UserCheck, Clock, ArrowRight, BellRing, CheckCircle2, UserMinus, BarChart, Users } from 'lucide-react';
import { toast } from 'sonner';

const AdminQueue: React.FC = () => {
  const { queue, markAsActive, markAsComplete, stats } = useQueue();
  
  // Get only waiting and active items
  const activeQueue = queue.filter(item => 
    item.status === 'waiting' || item.status === 'active'
  );
  
  const currentlyServing = activeQueue.find(item => item.status === 'active');
  const waitingItems = activeQueue.filter(item => item.status === 'waiting');
  
  const handleMarkAsComplete = (id: string) => {
    markAsComplete(id);
    toast.success('Student has been marked as complete', {
      description: 'The next student in queue will be called automatically',
      duration: 3000,
    });
  };
  
  const handleCallStudent = (id: string) => {
    markAsActive(id);
    toast('Student has been called', {
      description: 'The student will be notified about their turn',
      icon: <BellRing className="h-4 w-4" />,
      duration: 3000,
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card className="glass-card overflow-hidden border-gray-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent pb-2 border-b">
            <CardTitle className="text-xl flex items-center">
              <UserCheck className="mr-2 h-5 w-5 text-queue-primary" />
              <span>Currently Serving</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {!currentlyServing ? (
              <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg bg-white">
                <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No student currently being served</p>
                {waitingItems.length > 0 && (
                  <Button 
                    className="gap-2 animate-pulse"
                    onClick={() => handleCallStudent(waitingItems[0].id)}
                  >
                    Call Next Student
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-green-50 rounded-lg border border-green-200 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full bg-green-100 border-4 border-green-200 flex items-center justify-center text-xl font-bold text-green-700 mr-4">
                      {currentlyServing.position}
                    </div>
                    <div>
                      <div className="font-medium text-lg">{currentlyServing.studentName}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-white">ID: {currentlyServing.studentId}</Badge>
                        <span>•</span>
                        <Badge className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-none">
                          {currentlyServing.serviceName}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800 gap-2"
                      onClick={() => handleMarkAsComplete(currentlyServing.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Complete
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800 gap-2"
                    >
                      <UserMinus className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center px-4">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    Serving for {Math.floor((Date.now() - currentlyServing.timestamp) / 60000)} minutes
                  </span>
                  
                  {waitingItems.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCallStudent(waitingItems[0].id)}
                      className="gap-2"
                    >
                      <ArrowRight className="h-4 w-4" />
                      Next Student
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="glass-card overflow-hidden border-gray-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent pb-2 border-b">
            <CardTitle className="text-xl flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-queue-primary" />
                <span>Waiting List</span>
              </div>
              <Badge variant="outline" className="ml-2 bg-blue-50 text-queue-primary">
                {stats.totalWaiting} Waiting
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {waitingItems.length === 0 ? (
              <div className="text-center py-10 text-gray-500 border border-dashed border-gray-300 rounded-lg bg-white">
                <CheckCircle2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p>All students have been served</p>
                <p className="text-sm text-gray-400 mt-2">Queue is empty</p>
              </div>
            ) : (
              <div className="space-y-3">
                {waitingItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center font-semibold text-blue-700 mr-4">
                      {item.position}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.studentName}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <span>{item.serviceName}</span>
                        <span>•</span>
                        <span>ID: {item.studentId}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="gap-2 text-blue-700 hover:bg-blue-50"
                        onClick={() => handleCallStudent(item.id)}
                      >
                        <BellRing className="h-4 w-4" />
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
      
      <div className="space-y-6">
        <Card className="glass-card overflow-hidden border-gray-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent pb-2 border-b">
            <CardTitle className="text-xl flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-queue-primary" />
              <span>Queue Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500">Currently Serving</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {currentlyServing ? currentlyServing.studentName : "No one"}
                </div>
                {currentlyServing && (
                  <Badge className="bg-green-100 text-green-800 mt-2">
                    {currentlyServing.serviceName}
                  </Badge>
                )}
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500">Students Waiting</div>
                <div className="text-2xl font-bold text-queue-primary mt-1">
                  {stats.totalWaiting}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-queue-primary h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, stats.totalWaiting * 10)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500">Average Wait Time</div>
                <div className="text-2xl font-bold text-amber-500 mt-1">
                  {Math.round(stats.averageWaitTime)} min
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-amber-500 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, stats.averageWaitTime * 2)}%` }}
                  ></div>
                </div>
              </div>
              
              <Button className="w-full mt-4">
                View Full Statistics
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card overflow-hidden border-gray-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent pb-2 border-b">
            <CardTitle className="text-xl flex items-center">
              <Check className="mr-2 h-5 w-5 text-queue-primary" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-left">
                <Users className="mr-2 h-4 w-4" />
                View All Students
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                <BarChart className="mr-2 h-4 w-4" />
                Generate Reports
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                <Clock className="mr-2 h-4 w-4" />
                Manage Service Hours
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminQueue;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useQueue } from '@/contexts/QueueContext';
import QueueDisplay from '@/components/QueueDisplay';
import { Link } from 'react-router-dom';
import { currentUser } from '@/lib/data';
import { ArrowRight, Clock, ClipboardCheck, Users } from 'lucide-react';

const Index = () => {
  const { stats, getUserQueueItem } = useQueue();
  const userQueueItem = getUserQueueItem(currentUser.id);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Smart Queue Management System</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Skip the long lines and manage your time efficiently with our digital queueing system for school offices.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <ClipboardCheck className="h-6 w-6 mr-2 text-queue-primary" />
            How It Works
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <ol className="space-y-6">
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-queue-primary text-white font-bold mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Choose a service</h3>
                  <p className="text-gray-600 mt-1">Select the type of assistance you need from our available services.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-queue-primary text-white font-bold mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Join the queue</h3>
                  <p className="text-gray-600 mt-1">Reserve your spot without having to wait in a physical line.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-queue-primary text-white font-bold mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Track your position</h3>
                  <p className="text-gray-600 mt-1">Monitor your place in the queue and receive updates on wait time.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-queue-primary text-white font-bold mr-4">
                  4
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Get served</h3>
                  <p className="text-gray-600 mt-1">When it's your turn, head to the office for your service.</p>
                </div>
              </li>
            </ol>
            
            <div className="mt-8">
              <Link to="/services">
                <Button className="w-full">
                  View Available Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <Clock className="h-6 w-6 mr-2 text-queue-primary" />
            Current Queue Status
          </h2>
          <QueueDisplay />
          
          <div className="mt-6">
            {userQueueItem ? (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <p className="font-medium text-queue-primary">You are currently in the queue!</p>
                  <p className="text-gray-600 text-sm mt-1">Position: {userQueueItem.position} for {userQueueItem.serviceName}</p>
                  
                  <div className="mt-4">
                    <Link to="/status">
                      <Button variant="outline" className="w-full">
                        View Your Status
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="font-medium">Ready to join the queue?</p>
                  <p className="text-gray-600 text-sm mt-1">Currently {stats.totalWaiting} students waiting</p>
                  
                  <div className="mt-4">
                    <Link to="/services">
                      <Button className="w-full">
                        Join Queue Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

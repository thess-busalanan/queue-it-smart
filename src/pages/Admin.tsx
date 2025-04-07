
import React from 'react';
import { useQueue } from '@/contexts/QueueContext';
import AdminQueue from '@/components/AdminQueue';
import QueueStats from '@/components/QueueStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ListChecks, BarChart } from 'lucide-react';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            <span className="text-gradient">Admin Dashboard</span>
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Manage queue, call students, and monitor real-time statistics for efficient service delivery.
          </p>
        </div>
        
        <Tabs defaultValue="queue" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="queue" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              <span>Queue</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Statistics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Staff</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="queue" className="animate-fade-in">
            <AdminQueue />
          </TabsContent>
          
          <TabsContent value="stats" className="animate-fade-in">
            <QueueStats />
          </TabsContent>
          
          <TabsContent value="settings" className="animate-fade-in">
            <div className="glass-card p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Staff Management</h3>
              <p className="text-gray-600">This section will allow you to manage staff accounts and permissions.</p>
              <div className="flex justify-center mt-8">
                <div className="p-8 rounded-lg border border-dashed border-gray-300 text-gray-500 text-center w-full max-w-md">
                  <Users className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                  <h4 className="text-lg font-medium mb-2">Staff Management Coming Soon</h4>
                  <p>This feature is under development and will be available in the next update.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

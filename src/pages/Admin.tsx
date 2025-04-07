
import React from 'react';
import { useQueue } from '@/contexts/QueueContext';
import AdminQueue from '@/components/AdminQueue';
import QueueStats from '@/components/QueueStats';

const Admin = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage queue, call students, and view statistics.
        </p>
      </div>
      
      <QueueStats />
      
      <div className="mt-8">
        <AdminQueue />
      </div>
    </div>
  );
};

export default Admin;

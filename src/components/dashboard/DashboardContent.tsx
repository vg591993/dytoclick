// src/components/dashboard/DashboardContent.tsx
import React from 'react';
import DashboardNav from './DashboardNav';
import MetricsGrid from './MetricsGrid';
import QuickActions from './QuickActions';
import UpcomingClients from './UpcomingClients';
import ClientProgress from './ClientProgress';
// import ClientList from './ClientList';
import { Metric, Consultation, QuickAction } from '@/types/dashboard';
import { User, Star, Utensils, TrendingUp, Plus, FileText, List, Edit } from 'lucide-react';

const DashboardContent = () => {

  const metrics: Metric[] = [
    { title: 'Total Clients', value: '24', trend: '+2', icon: <User className="w-6 h-6" /> },
    { title: 'Client Rating', value: '4.8', trend: '+0.2', icon: <Star className="w-6 h-6" /> },
    { title: 'Active Plans', value: '18', trend: '+3', icon: <Utensils className="w-6 h-6" /> },
    { title: 'Goal Progress', value: '78%', trend: '+5%', icon: <TrendingUp className="w-6 h-6" /> }
  ];

  const upcomingConsultations: Consultation[] = [
    { name: 'Sarah Johnson', time: '10:00 AM', type: 'Initial Consultation' },
    { name: 'Mike Chen', time: '11:30 AM', type: 'Follow-up' },
    { name: 'Emma Williams', time: '2:00 PM', type: 'Diet Review' }
  ];

  const quickActions: QuickAction[] = [
    { title: 'Add Client', icon: <Plus className="w-5 h-5" />},
    { title: 'Edit Rules', icon: <FileText className="w-5 h-5" />},
    { title: 'Client List', icon: <List className="w-5 h-5" />},
    { title: 'Edit Profile', icon: <Edit className="w-5 h-5" />}
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F7F7] via-[#D0F0F0] to-[#B8E8E8] animate-gradient-x">
      <DashboardNav/>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-medium text-gray-800 mb-6 bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
          Welcome back, Dr. Smith
        </h1>
        <QuickActions actions={quickActions} />
        <MetricsGrid metrics={metrics} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UpcomingClients consultations={upcomingConsultations} />
          <ClientProgress />
          {/* <ClientList clients={upcomingConsultations} /> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
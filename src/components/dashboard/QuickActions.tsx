// src/components/dashboard/QuickActions.tsx
'use client';
import React, { useState } from 'react';
import { QuickAction } from '@/types/dashboard';
import { useRouter } from 'next/navigation';
import ClientListModal from './ClientListModal';

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  const router = useRouter();
  const [isClientListOpen, setIsClientListOpen] = useState(false);

  // Helper function to handle navigation with action
  const handleAction = (action: QuickAction) => {
    if (action.title === 'Add Client') {
      router.push('/dashboard/new-client');
    } else if (action.title === 'Client List') {
      setIsClientListOpen(true);
    } else if (action.title === 'Edit Profile') {
      router.push('/dashboard/edit-profile');
    } else if (action.title === 'Edit Rules') {
      router.push('/dashboard/edit-rules');
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleAction(action)}
            className="group flex items-center justify-center space-x-2 p-4 bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="text-teal-500 group-hover:scale-110 transition-transform duration-300">{action.icon}</span>
            <span className="text-gray-700 group-hover:text-teal-600 transition-colors">{action.title}</span>
          </button>
        ))}
      </div>

      <ClientListModal isOpen={isClientListOpen} onClose={() => setIsClientListOpen(false)} />
    </>
  );
};

export default QuickActions;
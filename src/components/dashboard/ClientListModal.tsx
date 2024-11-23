// src/components/dashboard/ClientListModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import ClientListItem from './ClientListItem';
import { Client } from '@/types/dashboard';

interface ClientListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClientListModal: React.FC<ClientListModalProps> = ({ isOpen, onClose }) => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchClients = async () => {
      try {
        // Attempt to retrieve token from localStorage or cookies
        const token = localStorage.getItem('authToken') || document.cookie.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1];
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch('https://cytoclick.ai/backend/person/all', {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin' // This will include cookies in the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch client data');
        }

        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
            Client List
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Client List */}
        <div className="overflow-y-auto flex-1 p-4">
          <div className="space-y-3">
            {clients.length > 0 ? (
              clients.map((client) => (
                <ClientListItem key={client.id} client={client} />
              ))
            ) : (
              <p className="text-center text-gray-500">No clients found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientListModal;

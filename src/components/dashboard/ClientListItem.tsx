// src/components/dashboard/ClientListItem.tsx
import React from 'react';
import { Phone, User } from 'lucide-react';
import { Client } from '@/types/dashboard';
import { useRouter } from 'next/navigation';

interface ClientListItemProps {
  client: Client;
}



const ClientListItem: React.FC<ClientListItemProps> = ({ client }) => {
    const clientID = client.id;
    const router = useRouter();
  return (
    <div className="p-4 bg-white border rounded-xl hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 flex items-center justify-center text-white font-medium">
            {client.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">
                {client.name}
              </h3>
              {/* <span className="px-2 py-1 bg-teal-50 text-teal-600 text-xs rounded-full">
                {client.type}
              </span> */}
            </div>
            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{client.age} yrs</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>{client.phoneNumber}</span>
              </div>
            </div>
          </div>
        </div>
        <button
              onClick={() => router.push(`/dashboard/health?clientID=${clientID}`)}
            className="opacity-50 group-hover:opacity-100 transition-opacity duration-200 px-4 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-lg">
        View Details
        </button>
      </div>
    </div>
  );
};

export default ClientListItem;
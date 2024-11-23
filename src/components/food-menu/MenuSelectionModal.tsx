'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Card } from '@/components/ui/card';
import { menuApi } from '@/app/api/services/menu-api';
import { Button } from '@/components/ui/button';

interface Menu {
  id: string;
  name: string;
}

interface MenuSelectionModalProps {
  onSelect: (menuName: string) => void;
}

export const MenuSelectionModal: React.FC<MenuSelectionModalProps> = ({ onSelect }) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ type: 'auth' | 'general'; message: string } | null>(null);

  const fetchMenus = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const menuData = await menuApi.getMenus();
      setMenus(menuData);
    } catch (err) {
      if (err instanceof Error && err.name === 'AuthError') {
        setError({ 
          type: 'auth', 
          message: 'Please log in to view menus.' 
        });
      } else {
        setError({ 
          type: 'general', 
          message: 'Failed to load menus. Please try again later.' 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const modalContent = (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-modalSlideIn">
        <Card className="bg-gradient-to-b from-[#f7f0c5] to-[#b7debf] p-6 md:p-8 flex flex-col h-[80vh] shadow-xl rounded-3xl border-0">
          <h2 className="text-2xl font-bold text-[#2C4F45] mb-6 flex-shrink-0 text-center">Select a Menu</h2>
          
          <div className="grid gap-3 overflow-y-auto pr-2 custom-scrollbar">
            {menus.map((menu) => (
              <div
                key={menu.name}
                onClick={() => onSelect(menu.name)}
                className="group bg-gradient-to-r from-[#e4edd3] to-[#99d5ba] hover:from-[#d8efe9] hover:to-[#e5f4ef] 
                         rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300
                         border border-[#88c4b4]/90"
              >
                <span className="text-lg font-medium text-[#2C4F45]">{menu.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  if (isLoading) {
    return createPortal(
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-2xl animate-modalSlideIn">
          <Card className="bg-gradient-to-b from-[#fff6e9] to-[#f7e8d6] p-6 md:p-8 rounded-3xl border-0">
            <h2 className="text-2xl font-bold text-[#2C4F45] mb-6 text-center">Loading menus...</h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2C4F45]"></div>
            </div>
          </Card>
        </div>
      </div>,
      document.body
    );
  }

  if (error) {
    return createPortal(
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-2xl animate-modalSlideIn">
          <Card className="bg-gradient-to-b from-[#fff6e9] to-[#f7e8d6] p-6 md:p-8 rounded-3xl border-0">
            <h2 className="text-2xl font-bold text-[#2C4F45] mb-6 text-center">Error</h2>
            <p className="text-red-500 mb-6 text-center">{error.message}</p>
            {error.type === 'auth' ? (
              <Button 
                onClick={() => {
                  window.location.href = '/login';
                }}
                className="w-full bg-[#2C4F45] text-white hover:bg-[#1A2F29] rounded-xl"
              >
                Go to Login
              </Button>
            ) : (
              <Button 
                onClick={fetchMenus}
                className="w-full bg-[#2C4F45] text-white hover:bg-[#1A2F29] rounded-xl"
              >
                Try Again
              </Button>
            )}
          </Card>
        </div>
      </div>,
      document.body
    );
  }

  return createPortal(modalContent, document.body);
};

export default MenuSelectionModal;
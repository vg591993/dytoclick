"use client";

import { useState, useEffect } from 'react';
import { DietExchangeList } from './DietExchangeList';
import { PatientProfile } from './PatientProfile';
import { RequirementsGrid } from './RequirementsGrid';
import { RDASection } from './RDASection';
import { DashboardHeader } from './DashboardHeader';
import { BottomNavigation } from './BottomNavigation';
import { Layers, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { ClientData, Requirements, RDAData } from '@/types/health';
import { useSearchParams } from 'next/navigation';
import { HealthDashboardSkeleton, DietExchangeListSkeleton } from './Skeletons/HealthDashboardSkeleton';
import { fetchClientData, fetchRequirements, fetchRDAData } from '@/app/api/healthdashboard-api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { XCircle } from 'lucide-react';

interface LoadingState {
  client: boolean;
  requirements: boolean;
  rda: boolean;
}

interface ErrorState {
  client: string | null;
  requirements: string | null;
  rda: string | null;
}

const HealthDashboard = () => {
  const [isExpertMode, setIsExpertMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarFullWidth, setSidebarFullWidth] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  
  const [loading, setLoading] = useState<LoadingState>({
    client: true,
    requirements: true,
    rda: true
  });
  
  const [errors, setErrors] = useState<ErrorState>({
    client: null,
    requirements: null,
    rda: null
  });
  
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [requirements, setRequirements] = useState<Requirements | null>(null);
  const [rdaData, setRDAData] = useState<RDAData | null>(null);

  const searchParams = useSearchParams();
  const clientID = searchParams.get('clientID') || '';

  useEffect(() => {
    const token = localStorage.getItem('authToken') || 
                 document.cookie.split('; ')
                 .find(row => row.startsWith('auth-token='))
                 ?.split('=')[1];
    setAuthToken(token || null);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Reset states
      setLoading({ client: true, requirements: true, rda: true });
      setErrors({ client: null, requirements: null, rda: null });

      if (!authToken) {
        const authError = 'Authentication token not found';
        setErrors({
          client: authError,
          requirements: authError,
          rda: authError
        });
        setLoading({ client: false, requirements: false, rda: false });
        return;
      }

      // Fetch all data in parallel
      const fetchPromises = [
        fetchClientData(clientID, authToken)
          .then(data => {
            setClientData(data);
            setLoading(prev => ({ ...prev, client: false }));
          })
          .catch(error => {
            setErrors(prev => ({ ...prev, client: error.message }));
            setLoading(prev => ({ ...prev, client: false }));
          }),

        fetchRequirements(clientID, authToken)
          .then(data => {
            setRequirements(data);
            setLoading(prev => ({ ...prev, requirements: false }));
          })
          .catch(error => {
            setErrors(prev => ({ ...prev, requirements: error.message }));
            setLoading(prev => ({ ...prev, requirements: false }));
          }),

        fetchRDAData(clientID, authToken)
          .then(data => {
            setRDAData(data);
            setLoading(prev => ({ ...prev, rda: false }));
          })
          .catch(error => {
            setErrors(prev => ({ ...prev, rda: error.message }));
            setLoading(prev => ({ ...prev, rda: false }));
          })
      ];

      await Promise.allSettled(fetchPromises);
    };

    if (clientID) {
      fetchData();
    }
  }, [clientID, authToken]);

  // Helper to check if any data is still loading
  const isLoading = Object.values(loading).some(Boolean);

  // Helper to check if all required data is available for the view
  const hasRequiredData = clientData && requirements && rdaData;

  // Render error alerts if any
  const renderErrors = () => {
    const errorMessages = Object.entries(errors)
      .filter(([_, error]) => error !== null)
      .map(([key, error]) => ({ key, error }));
  
    if (errorMessages.length === 0) return null;
  
    return (
      <div className="space-y-3 mb-6 animate-in fade-in-50 duration-500">
        {errorMessages.map(({ key, error }) => (
          <Alert 
            key={key} 
            variant="destructive" 
            className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 shadow-sm
                       hover:shadow-md transition-all duration-300 cursor-default
                       backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-red-100/80">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-red-800 mb-0.5">
                  {key.charAt(0).toUpperCase() + key.slice(1)} Error
                </div>
                <AlertDescription className="text-red-600">
                  {error}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        ))}
      </div>
    );
  };

  const renderBasicView = () => (
    <div className="space-y-8">
      {renderErrors()}
      {!isLoading && hasRequiredData ? (
        <>
          <PatientProfile clientData={clientData} />
          <RequirementsGrid 
            requirements={requirements} 
            foodPreferences={clientData.foodPreferences} 
          />
          <RDASection rdaData={rdaData} />
        </>
      ) : null}
    </div>
  );

  const renderExpertView = () => (
    <div className="relative flex">
      <div 
        className={`smooth-transition ${
          sidebarOpen 
            ? sidebarFullWidth 
              ? 'w-0 opacity-0' 
              : 'w-1/2 pr-4' 
            : 'w-full'
        }`}
      >
        <div className="space-y-6">
          {renderErrors()}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#f8e6d3] to-[#e9f0e6]">
                <Layers className="w-6 h-6 text-[#2a5b52]" />
              </div>
              <h2 className="text-2xl font-semibold gradient-text">Expert Mode</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="action-card p-2 text-[#2a5b52] hover-float smooth-transition"
            >
              {sidebarOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {isLoading ? (
            <DietExchangeListSkeleton />
          ) : (
            <div id="exchange-list" className="base-card">
              <DietExchangeList 
                sidebarOpen={sidebarOpen} 
                clientId={clientID} 
                token={authToken || ''} 
              />
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full bg-white/95 backdrop-blur-md border-l border-[#e9f0e6] 
                   overflow-y-auto smooth-transition shadow-xl
                   ${sidebarOpen 
                     ? 'translate-x-0' 
                     : 'translate-x-full'
                   } ${sidebarFullWidth 
                     ? 'w-full' 
                     : 'w-1/2'
                   }`}
      >
        <div className="sticky top-0 z-10 p-4 bg-white/80 backdrop-blur-sm border-b border-[#e9f0e6]">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold gradient-text">Basic Information</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarFullWidth(!sidebarFullWidth)}
                className="p-2 rounded-full hover:bg-[#f4f8f6] text-[#2a5b52] smooth-transition"
              >
                {sidebarFullWidth ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-[#f4f8f6] text-[#2a5b52] smooth-transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 animate-in slide-in-from-right">
          {renderBasicView()}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-pattern overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-8 pb-28">
        <DashboardHeader />
        {isLoading ? (
          <HealthDashboardSkeleton isExpertMode={isExpertMode} />
        ) : (
          isExpertMode ? renderExpertView() : renderBasicView()
        )}
        <BottomNavigation 
          isExpertMode={isExpertMode}
          clientID={clientID}
          onExpertModeToggle={() => {
            setIsExpertMode(!isExpertMode);
            setSidebarOpen(true);
            setSidebarFullWidth(false);
          }}
        />
      </div>
    </div>
  );
};

export default HealthDashboard;
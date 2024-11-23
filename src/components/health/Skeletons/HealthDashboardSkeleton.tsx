// components/health/skeletons/HealthDashboardSkeleton.tsx
import React from 'react';

interface SkeletonProps {
  className?: string;
}

const SkeletonLine: React.FC<SkeletonProps> = ({ className = "" }) => (
  <div className={`h-4 bg-gray-200 rounded animate-pulse ${className}`} />
);

const SkeletonBox: React.FC<SkeletonProps> = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

const ProfileSkeleton: React.FC = () => (
  <div className="base-card p-6 space-y-4">
    <div className="flex items-center gap-4">
      <SkeletonBox className="w-16 h-16 rounded-full" />
      <div className="space-y-2 flex-1">
        <SkeletonLine className="w-1/3" />
        <SkeletonLine className="w-1/4" />
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-1">
          <SkeletonLine className="w-1/2" />
          <SkeletonLine className="w-3/4" />
        </div>
      ))}
    </div>
  </div>
);

const RequirementsGridSkeleton: React.FC = () => (
  <div className="base-card p-6">
    <SkeletonLine className="w-1/4 mb-6" />
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border rounded-lg space-y-2">
          <SkeletonLine className="w-1/2" />
          <SkeletonBox className="h-8 w-full" />
        </div>
      ))}
    </div>
  </div>
);

const RDASectionSkeleton: React.FC = () => (
  <div className="base-card p-6 space-y-6">
    <SkeletonLine className="w-1/4" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          <SkeletonLine className="w-1/3" />
          {[...Array(6)].map((_, j) => (
            <div key={j} className="flex justify-between items-center">
              <SkeletonLine className="w-1/3" />
              <SkeletonLine className="w-1/4" />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const DietExchangeListSkeleton: React.FC = () => (
  <div className="base-card">
    <div className="space-y-4 p-6">
      <SkeletonLine className="w-1/3" />
      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <SkeletonBox key={i} className="h-24" />
        ))}
      </div>
    </div>
  </div>
);

interface HealthDashboardSkeletonProps {
  isExpertMode?: boolean;
}

export const HealthDashboardSkeleton: React.FC<HealthDashboardSkeletonProps> = ({ 
  isExpertMode = false 
}) => {
  const BasicViewSkeleton = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <ProfileSkeleton />
      <RequirementsGridSkeleton />
      <RDASectionSkeleton />
    </div>
  );

  const ExpertViewSkeleton = () => (
    <div className="relative flex">
      <div className="w-1/2 pr-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <SkeletonBox className="w-48 h-12" />
            <SkeletonBox className="w-8 h-8" />
          </div>
          <DietExchangeListSkeleton />
        </div>
      </div>
      <div className="fixed top-0 right-0 w-1/2 h-full bg-white/95 backdrop-blur-md border-l border-[#e9f0e6] overflow-y-auto">
        <div className="sticky top-0 z-10 p-4 bg-white/80 backdrop-blur-sm border-b border-[#e9f0e6]">
          <div className="flex justify-between items-center">
            <SkeletonLine className="w-32" />
            <div className="flex items-center gap-2">
              <SkeletonBox className="w-8 h-8" />
              <SkeletonBox className="w-8 h-8" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <BasicViewSkeleton />
        </div>
      </div>
    </div>
  );

  return isExpertMode ? <ExpertViewSkeleton /> : <BasicViewSkeleton />;
};
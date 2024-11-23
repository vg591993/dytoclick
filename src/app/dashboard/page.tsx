// src/app/dashboard/page.tsx
import DashboardContent from '@/components/dashboard/DashboardContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | DytoClick',
  description: 'Dietician dashboard for managing clients and consultations',
};

export default function DashboardPage() {
  return <DashboardContent />;
}
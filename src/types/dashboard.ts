// src/types/dashboard.ts
import { LucideIcon } from 'lucide-react';

export interface Metric {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}

export interface Consultation {
  name: string;
  time: string;
  type: string;
}

export interface QuickAction {
  title: string;
  icon: React.ReactNode;
  //action: () => void;
}

export interface NavItem {
  label: string;
  value: string;
}

export interface Client {
  id: string;
  name: string;
  phoneNumber: string;
  age: number;
  type: string;
}
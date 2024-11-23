// src/components/landing/NutriCareLanding.tsx
'use client';

import Navigation from './Navigation';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import TimelineSection from './TimelineSection';
import TestimonialsSection from './TestimonialsSection';
import { useState, useEffect } from 'react';

export default function NutriCareLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
      <Navigation />
      <HeroSection isVisible={isVisible} />
      <ServicesSection />
      <TimelineSection scrollY={scrollY} />
      <TestimonialsSection isVisible={isVisible} />
    </div>
  );
}

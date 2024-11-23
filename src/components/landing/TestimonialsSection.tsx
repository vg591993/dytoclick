// src/components/landing/TestimonialsSection.tsx
'use client';

import { Star } from 'lucide-react';
import { Testimonial } from '@/types/landing';

interface TestimonialsSectionProps {
  isVisible: boolean;
}

export default function TestimonialsSection({ isVisible }: TestimonialsSectionProps) {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      text: "The personalized meal plans have transformed my relationship with food.",
      rating: 5
    },
    {
      name: "Mike Chen",
      text: "Expert guidance and amazing support throughout my health journey.",
      rating: 5
    },
    {
      name: "Emma Williams",
      text: "The progress tracking feature keeps me motivated every day.",
      rating: 5
    }
  ];

  return (
    <div className="container mx-auto px-6 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? '0' : '20px'})`,
              transition: `all 0.5s ${index * 0.1}s`
            }}
          >
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
            <p className="font-bold">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
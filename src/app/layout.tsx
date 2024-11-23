// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DytoClick - powered by CytoClick',
  description: 'Experience personalized nutrition guidance with cutting-edge technology and expert support.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
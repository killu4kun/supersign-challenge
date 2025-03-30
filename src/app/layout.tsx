import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/global.css';
import AuthProvider from '@/components/providers/SessionProvider';
import Navbar from '@/components/shared/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SuperSign - Assinatura Digital',
  description: 'Sistema de assinatura digital de documentos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <body className={`${inter.className} min-h-screen bg-slate-50`}>
        <AuthProvider>
          <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-1 container mx-auto px-4 py-8'>
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

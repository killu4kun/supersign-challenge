'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className='bg-slate-800 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <Link href='/dashboard' className='text-xl font-bold text-white'>
                SuperSign
              </Link>
            </div>
            <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
              <Link
                href='/dashboard/documents'
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/dashboard/documents')
                    ? 'border-indigo-400 text-white'
                    : 'border-transparent text-slate-300 hover:border-slate-300 hover:text-white'
                }`}
              >
                Meus Documentos
              </Link>
              <Link
                href='/dashboard/upload'
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/dashboard/upload')
                    ? 'border-indigo-400 text-white'
                    : 'border-transparent text-slate-300 hover:border-slate-300 hover:text-white'
                }`}
              >
                Upload
              </Link>
            </div>
          </div>
          <div className='flex items-center'>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className='ml-4 px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200'
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

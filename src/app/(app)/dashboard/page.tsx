'use client';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6 text-black'>Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Link
          href='/dashboard/documents'
          className='p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow'
        >
          <h2 className='text-xl font-semibold mb-2 text-black'>Meus Documentos</h2>
          <p className='text-gray-600'>Visualize e gerencie seus documentos</p>
        </Link>
        <Link
          href='/dashboard/upload'
          className='p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow'
        >
          <h2 className='text-xl font-semibold mb-2 text-black'>Upload de Documento</h2>
          <p className='text-gray-600'>Faça upload de novos documentos</p>
        </Link>
      </div>
    </div>
  );
}

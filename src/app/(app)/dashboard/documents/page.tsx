'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type Document = {
  id: string;
  name: string;
  fileKey: string;
  status: 'PENDING' | 'SIGNED';
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data } = await axios.get('/api/documents');
        setDocuments(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Meus Documentos</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {documents.map((doc) => (
          <div key={doc.id} className='border p-4 rounded-lg'>
            <h3 className='font-semibold'>{doc.name}</h3>
            <p
              className={`text-sm ${
                doc.status === 'PENDING' ? 'text-yellow-600' : 'text-green-600'
              }`}
            >
              {doc.status === 'PENDING' ? 'Pendente' : 'Assinado'}
            </p>
            <Link
              href={`/dashboard/${doc.id}`}
              className='mt-2 inline-block text-blue-600 hover:underline'
            >
              Visualizar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

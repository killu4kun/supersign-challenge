'use client';
import { useState } from 'react';
import api from '@/lib/axios';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/upload', formData);
      alert('Documento enviado com sucesso!');
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.error || 'Erro ao enviar documento');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded shadow'>
      <h2 className='text-xl font-bold mb-4 text-black'>Upload de Documento</h2>

      {error && (
        <div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type='file'
          accept='.pdf'
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className='mb-4 w-full p-2 border rounded text-black'
          required
        />
        <button
          type='submit'
          disabled={isLoading}
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed w-full'
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}

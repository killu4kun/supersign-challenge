'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { SignatureCanvas } from '@/components/documents/SignatureCanvas';
import { DocumentStatusBadge } from '@/components/documents/DocumentStatusBadge';

type DocumentDetails = {
  id: string;
  name: string;
  fileKey: string;
  status: 'PENDING' | 'SIGNED';
  signatures: {
    id: string;
    signedAt: Date;
    signatureImg: string;
  }[];
};

export default function DocumentSignPage() {
  const { id } = useParams();
  const router = useRouter();
  const [document, setDocument] = useState<DocumentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const { data } = await api.get(`/documents/${id}`);
        setDocument(data);
      } catch (error: any) {
        console.error('Error fetching document:', error);
        setError(error.response?.data?.error || 'Erro ao carregar documento');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocument();
  }, [id]);

  const handleDelete = async () => {
    if (!document) return;

    if (!confirm('Tem certeza que deseja excluir este documento?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await api.delete(`/documents/${id}`);
      router.push('/dashboard/documents');
    } catch (error: any) {
      console.error('Error deleting document:', error);
      setError(error.response?.data?.error || 'Erro ao excluir documento');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSignatureSave = (signatureData: string) => {
    if (!document) return;

    setDocument({
      ...document,
      status: 'SIGNED',
      signatures: [
        ...document.signatures,
        {
          id: 'temp',
          signedAt: new Date(),
          signatureImg: signatureData,
        },
      ],
    });
  };

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div className='text-red-600'>{error}</div>;
  if (!document) return <div>Documento não encontrado</div>;

  return (
    <div className='p-6 space-y-8'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <h1 className='text-2xl font-bold text-black'>{document.name}</h1>
          <DocumentStatusBadge status={document.status} />
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isDeleting ? 'Excluindo...' : 'Excluir Documento'}
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Visualizador de PDF */}
        <div className='border rounded-lg overflow-hidden'>
          <iframe
            src={`/uploads/${document.fileKey}`}
            className='w-full h-[500px] '
            title={document.name}
          />
        </div>

        {/* Área de Assinatura */}
        <div className='space-y-6'>
          <h2 className='text-xl font-semibold text-black'>Assinar Documento</h2>

          {document.status === 'SIGNED' ? (
            <div className='space-y-4'>
              <p className='text-green-600'>Documento já assinado em:</p>
              {document.signatures.map((sig) => (
                <div key={sig.id} className='border p-4 rounded-lg'>
                  <img
                    src={sig.signatureImg}
                    alt='Assinatura'
                    className='h-20 w-auto border'
                  />
                  <p className='text-sm text-gray-500 mt-2'>
                    {new Date(sig.signedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <SignatureCanvas
              documentId={document.id}
              onSave={handleSignatureSave}
            />
          )}
        </div>
      </div>
    </div>
  );
}

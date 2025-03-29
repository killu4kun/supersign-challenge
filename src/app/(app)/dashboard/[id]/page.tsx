'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
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
  const [document, setDocument] = useState<DocumentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const { data } = await axios.get(`/api/documents/${id}`);
        setDocument(data);
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocument();
  }, [id]);

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

  if (isLoading) return <div>Loading...</div>;
  if (!document) return <div>Document not found</div>;

  return (
    <div className='p-6 space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>{document.name}</h1>
        <DocumentStatusBadge status={document.status} />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Visualizador de PDF */}
        <div className='border rounded-lg overflow-hidden'>
          <iframe
            src={`/uploads/${document.fileKey}`}
            className='w-full h-[500px]'
            title={document.name}
          />
        </div>

        {/* Área de Assinatura */}
        <div className='space-y-6'>
          <h2 className='text-xl font-semibold'>Assinar Documento</h2>

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

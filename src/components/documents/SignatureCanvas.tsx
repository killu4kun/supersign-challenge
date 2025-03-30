'use client';
import { useRef, useState } from 'react';

type SignatureCanvasProps = {
  documentId: string;
  onSave?: (signatureData: string) => void;
};

export const SignatureCanvas = ({
  documentId,
  onSave,
}: SignatureCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  // Limpar canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
  };

  // Começar a desenhar
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { offsetX, offsetY } = getPosition(e, canvas);

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
  };

  // Desenhar
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { offsetX, offsetY } = getPosition(e, canvas);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  // Finalizar desenho
  const endDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.closePath();
    setIsDrawing(false);
    setSignature(canvas.toDataURL()); // Salva como base64
  };

  // Salvar assinatura
  const handleSave = async () => {
    if (!signature) return;

    try {
      const response = await fetch('/api/signatures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId,
          signatureImg: signature,
        }),
      });

      if (response.ok && onSave) {
        onSave(signature);
      }
    } catch (error) {
      console.error('Error saving signature:', error);
    }
  };

  // Helper para coordenadas
  const getPosition = (
    e: React.MouseEvent | React.TouchEvent,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    let offsetX, offsetY;

    if ('touches' in e) {
      offsetX = e.touches[0].clientX - rect.left;
      offsetY = e.touches[0].clientY - rect.top;
    } else {
      offsetX = e.nativeEvent.offsetX;
      offsetY = e.nativeEvent.offsetY;
    }

    return { offsetX, offsetY };
  };

  return (
    <div className='space-y-4'>
      <div className='border-2 border-dashed rounded-lg'>
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
          className='w-full h-full touch-none bg-white'
        />
      </div>

      <div className='flex gap-2'>
        <button
          onClick={clearCanvas}
          className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black'
        >
          Limpar
        </button>
        <button
          onClick={handleSave}
          disabled={!signature}
          className={`px-4 py-2 rounded text-white ${
            signature
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Salvar Assinatura
        </button>
      </div>
    </div>
  );
};

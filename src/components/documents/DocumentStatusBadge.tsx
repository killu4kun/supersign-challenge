'use client';
import { cn } from '@/lib/utils';

type DocumentStatusBadgeProps = {
  status: 'PENDING' | 'SIGNED';
  className?: string;
};

export const DocumentStatusBadge = ({
  status,
  className,
}: DocumentStatusBadgeProps) => {
  return (
    <span
      className={cn(
        'px-3 py-1 rounded-full text-sm font-medium',
        status === 'PENDING'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-green-100 text-green-800',
        className
      )}
    >
      {status === 'PENDING' ? 'Pendente' : 'Assinado'}
    </span>
  );
};

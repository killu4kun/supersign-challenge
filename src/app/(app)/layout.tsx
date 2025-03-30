import ProtectedRoute from '@/components/shared/ProtectedRoute';
import Navbar from '@/components/shared/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-slate-50'>
        <Navbar />
        <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='bg-white shadow-sm rounded-lg p-6'>{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

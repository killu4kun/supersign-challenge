import ProtectedRoute from '@/components/shared/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className='flex min-h-screen'>
        <aside className='w-64 bg-gray-800 text-white p-4'>
          {/* Sidebar content */}
          <nav>...</nav>
        </aside>
        <main className='flex-1 p-8'>{children}</main>
      </div>
    </ProtectedRoute>
  );
}

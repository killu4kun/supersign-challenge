import Navbar from '@/components/shared/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1 container mx-auto px-4 py-8'>{children}</main>
    </div>
  );
}

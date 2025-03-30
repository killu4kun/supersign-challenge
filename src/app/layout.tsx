import "../styles/global.css";
import AuthProvider from '@/components/providers/SessionProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <body className='bg-gray-50 min-h-screen flex items-center justify-center'>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
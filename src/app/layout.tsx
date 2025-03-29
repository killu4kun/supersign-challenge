import "../styles/global.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <body className='bg-gray-50 min-h-screen flex items-center justify-center'>
        {children}
      </body>
    </html>
  );
}

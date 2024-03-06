import LoginLayout from '@/components/LoginLayout';
export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-full flex items-center justify-center'>
    <div className='w-1/2 h-screen bg-primary'>
      <LoginLayout>
      <main >
      {children}
      </main>
      </LoginLayout>
    </div>
    </div>
  );
}
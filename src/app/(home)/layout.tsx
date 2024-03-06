import HomeLayout from "@/components/HomeLayout";
export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HomeLayout>
      <main className='p-2'>
      {children}
      </main>
      </HomeLayout>
    </div>
  );
}
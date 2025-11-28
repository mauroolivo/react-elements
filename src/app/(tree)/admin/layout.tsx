import Link from 'next/link';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-amber-500">
        <Link className='btn' href={`/admin/user/1`}>User 1</Link>
        <Link href={`/admin/user/2?action=edit`}>User 2 action edit</Link>
      </div>
      {children}
    </>
  );
}

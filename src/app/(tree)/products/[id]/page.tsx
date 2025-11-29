import { getProductById } from '@/app/api/api';

type Product = {
  id: number;
  title: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data: Product = await getProductById(id);
  return <h1>{data.title}</h1>;
}

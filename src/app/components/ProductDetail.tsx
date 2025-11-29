import { getProductById } from '@/app/api/api';
import { Product } from '@/app/models/product';
import ProductEdit from './ProductEdit';

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data: Product = await getProductById(id);
  return (
    <>
      <h1>{data.title}</h1>
        <p>{data.description}</p>
        <p>Price: ${data.price}</p>
        <p>Category: {data.category}</p>
        <p>Brand: {data.brand}</p>
        <p>Stock: {data.stock}</p>

        <ProductEdit params={data} />
    </>
  );
}

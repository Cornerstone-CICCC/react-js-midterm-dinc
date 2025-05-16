import ProductCard from './product-card';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div
      className={cn('grid grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-2 lg:gap-4')}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

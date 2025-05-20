import Image from 'next/image';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product._id}`);
  };

  return (
    <div
      className="flex flex-col w-full cursor-pointer hover:opacity-80"
      onClick={handleClick}
    >
      <div className="relative aspect-square rounded bg-gray-200">
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          fill
          className="object-cover p-1"
        />
        {!product.status && (
          <div className="absolute inset-0 rounded bg-stone-950/75 flex items-center justify-center">
            <span className="text-stone-100 text-lg font-bold">SOLD OUT</span>
          </div>
        )}
      </div>
      <div className="mb-2 md:mb-0">
        <p className="font-bold mt-1 text-base">${product.price}</p>
        <h2 className="line-clamp-2 text-xs md:text-sm">{product.name}</h2>
      </div>
    </div>
  );
};

export default ProductCard;

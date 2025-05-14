import Image from 'next/image';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  status: boolean;
  onClick: () => void;
  isLoading?: boolean;
}

function ProductCard({
  image,
  name,
  price,
  status,
  onClick,
  isLoading = false,
}: ProductCardProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col w-[230px] animate-pulse">
        <div className="relative w-[230px] h-[230px] rounded bg-gray-200" />
        <div className="mt-2 h-4 w-3/4 bg-gray-200 rounded" />
        <div className="mt-1 h-6 w-1/2 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col w-[230px] cursor-pointer hover:opacity-80"
      onClick={onClick}
    >
      <div className="relative w-[230px] h-[230px] rounded bg-gray-300">
        <Image
          src={image}
          alt={name}
          fill
          className="max-w-full max-h-full object-contain"
        />
        {!status && (
          <div className="absolute inset-0 rounded bg-stone-950/75 flex items-center justify-center">
            <span className="text-stone-100 text-2xl font-bold">SOLD OUT</span>
          </div>
        )}
      </div>
      <h2 className="mt-2 text-md">{name}</h2>
      <p className="text-xl font-bold">${price.toFixed(2)}</p>
    </div>
  );
}

export { ProductCard };

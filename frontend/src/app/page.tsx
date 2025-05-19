'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { SearchProvider, useSearchContext } from '@/context/SearchContext';
import Image from 'next/image';
import SearchSidebar from '@/components/SearchSidebar';
import { useSearchParams } from 'next/navigation';
import { slugToTitle } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';

interface Product {
  _id: number;
  name: string;
  price: number;
  userId: number;
  imageUrls: string[];
  status: 'active' | 'inactive' | 'sold';
  categorySlug: string;
  createdAt: string;
  updatedAt: string;
}

const HomeChild = () => {
  const { searchInput, setSearch, selectedCategory } = useSearchContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const fetchProducts = async (query: string, category?: string) => {
    try {
      console.log('Fetching products with query:', query);
      const res = await fetch(
        `http://localhost:4500/products/search?search=${query}&category=${category || ''}`,
      );
      const { data } = await res.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // useEffect(() => {
  //   fetchProducts(searchQuery);
  // }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      fetchProducts(searchInput, selectedCategory);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchInput, selectedCategory]);

  return (
    <div className="flex w-full md:ml-[260px] pb-6 relative">
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-screen">
            <Spinner size={'large'}>Loading products...</Spinner>
          </div>
        }
      >
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 w-full p-2 max-md:mt-48">
          {products.length
            ? products.map((product) => (
                <Link href={`/products/${product._id}`} key={product._id}>
                  <div className="border p-2 min-h-[270px] shadow-md rounded-md hover:scale-105 transition max-w-[300px]">
                    <div className="relative w-full h-[150px] mb-2">
                      <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        fill
                        className="rounded-md object-cover"
                        sizes="(max-width: 768px) 100px, 150px"
                      />
                    </div>
                    <h2 className="line-clamp-2 text-sm text-gray-500 mb-2">
                      {product.name}
                    </h2>
                    <p>${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))
            : null}
          {loading && (
            <div className="fixed top-0 left-0 bg-gray-100/40 rounded-md flex items-center justify-center w-full h-screen">
              <Spinner size={'large'}>Loading products...</Spinner>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
};

const Home = () => {
  return (
    <div className="md:flex w-full">
      <SearchProvider>
        <SearchSidebar />
        <HomeChild />
      </SearchProvider>
    </div>
  );
};

export default Home;

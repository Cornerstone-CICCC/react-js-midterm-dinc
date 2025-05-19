'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { SearchProvider, useSearchContext } from '@/context/SearchContext';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import SearchSidebar from '@/components/SearchSidebar';
import { useSearchParams } from 'next/navigation';
import { slugToTitle } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';
import { set } from 'zod';

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
  const [fetchRef, setFetchRef] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [ref, inView, entry] = useInView({
    threshold: 0,
  });
  // const [pagination, setPagination] = useState({
  //   page: 1,
  //   limit: 10,
  //   total: 0,
  //   totalPages: 0,
  // });

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const fetchProducts = async () => {
    try {
      const req = await fetch(
        `http://localhost:4500/products/search?search=${searchInput}&category=${selectedCategory || ''}&page=${
          page
        }&limit=${limit}`,
      );
      const res = await req.json();
      const data = res.data;
      const newPagintaion = res.pagination;
      setProducts((prev) => [...prev, ...data]);
      setTotal(newPagintaion.total);
      // setPage((prev) => (prev += 1));
      setTotalPages(Math.ceil(newPagintaion.total / limit));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (inView && page <= totalPages) {
      console.log('inView', inView);
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        fetchProducts();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  useEffect(() => {
    if (loading) return;
    setProducts([]);
    setPage(1);
    setTotal(0);
    setTotalPages(0);
    setLimit(10);
    setLoading(true);
    setTimeout(async () => {
      await fetchProducts();
      setLoading(false);
    }, 0);
    console.log('selectedCategory', selectedCategory);
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
          <div ref={ref} className="h-20 w-full"></div>
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

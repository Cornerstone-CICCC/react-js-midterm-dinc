import ProductCard from './product-card';
import { Product } from '@/types/product';
import { cn, titleToSlug } from '@/lib/utils';
import { useSearchContext } from '@/context/SearchContext';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from 'use-debounce';
import { Spinner } from '../ui/spinner';

const ProductList = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const searchCategory = searchParams.get('category') || '';
  const { searchValue, setSearch, selectedCategory, handleCategory } =
    useSearchContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [initialFetched, setInitialFetched] = useState(false);
  const [debouncedHandleSearch] = useDebounce(searchQuery, 500);
  const [ref, inView, entry] = useInView({
    threshold: 0,
  });

  const fetchProducts = async (search?: string, category?: string) => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/search?search=${search}&category=${titleToSlug(category || '')}&page=${
          page
        }&limit=${limit}`,
      );
      const res = await req.json();
      const data = res.data;
      const newPagintaion = res.pagination;
      setProducts((prev) => [...prev, ...data]);
      setTotal(newPagintaion.total);
      setTotalPages(Math.ceil(newPagintaion.total / limit));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (searchQuery && !searchValue.length) {
      setSearch(searchQuery);
    }

    if (searchCategory && !selectedCategory.length) {
      handleCategory(titleToSlug(searchCategory));
    }
  }, []);

  useEffect(() => {
    if (loading) return;
    if (inView && page <= totalPages) {
      setLoading(true);
      setPage((prev) => (prev += 1));
      setLoading(false);
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
    if (initialFetched) {
      setTimeout(async () => {
        await fetchProducts(
          searchValue ? searchValue : searchQuery,
          selectedCategory ? selectedCategory : searchCategory,
        );
        setLoading(false);
      }, 100);
    }
  }, [debouncedHandleSearch, searchCategory]);

  useEffect(() => {
    setTimeout(async () => {
      await fetchProducts(
        searchValue ? searchValue : searchQuery,
        selectedCategory ? selectedCategory : searchCategory,
      );
      setLoading(false);
      if (!initialFetched) setInitialFetched(true);
    }, 100);
  }, [page]);

  return (
    <div>
      <div className="flex max-w-full w-full flex-1 md:ml-[260px] pb-6 relative">
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-screen">
              <Spinner size={'large'}>Loading products...</Spinner>
            </div>
          }
        >
          <div
            className={cn(
              'grid grid-cols-3 w-full lg:grid-cols-5 gap-1 sm:gap-2 lg:gap-4',
            )}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </Suspense>
      </div>
      <div ref={ref} className="h-20 w-full"></div>
      {loading && (
        <div className="fixed top-0 left-0 bg-gray-100/40 rounded-md flex items-center justify-center w-full h-screen">
          <Spinner size={'large'}>Loading products...</Spinner>
        </div>
      )}
    </div>
  );
};

export default ProductList;

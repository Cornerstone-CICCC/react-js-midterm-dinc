import ProductCard from './product-card';
import { Product } from '@/types/product';
import { cn, titleToSlug } from '@/lib/utils';
import { useState, useEffect, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '../ui/spinner';

interface ProductListProps {
  userId?: string;
  search?: string;
  category?: string;
  noResultsText?: React.ReactNode;
}

const ProductList = ({
  userId,
  search,
  category,
  noResultsText,
}: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [initialFetched, setInitialFetched] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0,
  });

  const fetchProducts = async (search?: string, category?: string) => {
    try {
      const params = new URLSearchParams({
        search: search || '',
        category: category || '',
        page: page.toString(),
        limit: limit.toString(),
      });
      if (userId) params.append('userId', userId);

      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/search${params.toString() ? '?' + params.toString() : ''}`,
      );
      const res = await req.json();
      const data = res.data;
      const newPagintaion = res.pagination;
      if (page === 1) {
        setProducts(data);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }
      setTotal(newPagintaion.total);
      setTotalPages(Math.ceil(newPagintaion.total / limit));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (inView && !loading && page <= totalPages) {
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
    setLoading(true);
    if (initialFetched) {
      setTimeout(async () => {
        await fetchProducts(search, category);
        setLoading(false);
      }, 100);
    }
  }, [search, category]);

  useEffect(() => {
    let isCancelled = false;

    const fetch = async () => {
      setLoading(true);
      await fetchProducts(
        search ? search : '',
        category ? titleToSlug(category) : '',
      );
      if (!isCancelled) {
        setLoading(false);
        if (!initialFetched) setInitialFetched(true);
      }
    };

    fetch();

    return () => {
      isCancelled = true;
    };
  }, [page]);

  const noResults = initialFetched && products.length === 0 && !loading;
  const noResultsTextComponent = (
    <div className="w-full absolute top-0 -z-1 left-0 h-full font-semibold flex text-center items-center justify-center text-2xl text-gray-400">
      {noResultsText ? (
        noResultsText
      ) : (
        <>
          No masterpieces found! <br />
          Try exploring something different.
        </>
      )}
    </div>
  );

  if (noResults) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        {noResultsTextComponent}
      </div>
    );
  }

  return (
    <div className="w-full px-2">
      <div className="flex max-w-full w-full flex-1 pb-18 md:pb-6 relative">
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-screen">
              <Spinner size={'large'}>Loading products...</Spinner>
            </div>
          }
        >
          <div
            className={cn(
              'grid grid-cols-2 gap-1 w-full md:grid-cols-2 lg:grid-cols-5 sm:gap-2 lg:gap-4',
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

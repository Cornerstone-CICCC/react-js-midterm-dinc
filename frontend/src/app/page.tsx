'use client';
import SearchSidebar from '@/components/SearchSidebar';
import HomeSkeleton from '@/components/home-skeleton';
import ProductList from '@/components/product/product-list';
import { useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';

const Home = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const searchCategory = searchParams.get('category') || '';
  const [debouncedHandleSearch] = useDebounce(searchQuery, 1000);

  const productSkeleton = true;

  if (!productSkeleton) {
    return <HomeSkeleton />;
  }
  return (
    <div className="md:flex w-full">
      <SearchSidebar />
      <ProductList category={searchCategory} search={debouncedHandleSearch} />
    </div>
  );
};

export default Home;

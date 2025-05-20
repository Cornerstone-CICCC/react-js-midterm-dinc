'use client';
import { SearchProvider } from '@/context/SearchContext';
import SearchSidebar from '@/components/SearchSidebar';
import HomeSkeleton from '@/components/home-skeleton';
import ProductList from '@/components/product/product-list';

const Home = () => {
  const productSkeleton = true;

  if (!productSkeleton) {
    return <HomeSkeleton />;
  }
  return (
    <div className="md:flex w-full">
      <SearchProvider>
        <SearchSidebar />
        <ProductList />
      </SearchProvider>
    </div>
  );
};

export default Home;

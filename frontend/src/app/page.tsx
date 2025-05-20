'use client';
import Head from 'next/head';
import SearchSidebar from '@/components/SearchSidebar';
import HomeSkeleton from '@/components/home-skeleton';
import ProductList from '@/components/product/product-list';
import { useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { useEffect } from 'react';

const Home = () => {
  const pageTitle = 'Home - DINCT';
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const searchCategory = searchParams.get('category') || '';
  const [debouncedHandleSearch] = useDebounce(searchQuery, 1000);

  useEffect(() => {
    document.title = pageTitle;
  }, [document.title]);

  const productSkeleton = true;

  if (!productSkeleton) {
    return <HomeSkeleton />;
  }
  return (
    <div className="min-h-[calc(100vh-50px-70px)] w-full md:flex">
      <Head>
        <title>{document.title}</title>
      </Head>
      <SearchSidebar />
      <ProductList category={searchCategory} search={debouncedHandleSearch} />
    </div>
  );
};

export default Home;

'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { SearchProvider, useSearchContext } from '@/context/SearchContext';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from 'use-debounce';
import SearchSidebar from '@/components/SearchSidebar';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import HomeSkeleton from '@/components/home-skeleton';
import { tilteToSlug } from '@/lib/utils';
import ProductList from '@/components/product/product-list';

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

const HomeChild = () => {};

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

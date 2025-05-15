'use client';
import { useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';
import Link from 'next/link';
import SearchLayout from '@/components/SearchLayout';
import { SearchProvider, useSearchContext } from '@/context/SearchContext';

type Props = {
  children: React.ReactNode;
}

const HomeChild = () => {

  const { search, setSearch, searchInput, setSearchInput, categories, handleCategory, handleResetFilter } = useSearchContext();

  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    setProducts(data.products);
    console.log(data.products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SearchLayout>
      <div className='grid grid-cols-4 gap-4 mt-20 w-full p-4'>
        {products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()) && (categories.length === 0 || categories.some(category => product.category.toLowerCase().includes(category.toLowerCase())))).map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className='border p-4 min-h-[270px] shadow-md rounded-md hover:scale-105 transition'>
              <img src={product.thumbnail || 'https://placehold.co/200x150'} alt='no image' />
              <h2 className='line-clamp-2 text-sm text-gray-500 mb-2'>{product.title}</h2>
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </SearchLayout>
  )
}

const Home = () => {
  return (
    <SearchProvider>
      <HomeChild />
    </SearchProvider>
  )
}

export default Home;

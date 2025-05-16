'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SearchProvider, useSearchContext } from '@/context/SearchContext';
import Image from 'next/image';
import SearchSidebar from '@/components/SearchSidebar';
import { useSearchParams } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  stock: number;
}

const HomeChild = () => {
  const { search, setSearch, selectedCategory } = useSearchContext();
  const [products, setProducts] = useState<Product[]>([]);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const fetchProducts = async (query: string) => {
    try {
      const res = await fetch(query.trim() ? `https://dummyjson.com/products/search?q=${query}` : 'https://dummyjson.com/products?limit=200');
      const data = await res.json();
      setProducts(data.products);
      console.log(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    if (search.trim() !== '') {
      fetchProducts(search);
    } else {
      fetchProducts('');
    }
  }, [search]);

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery, setSearch]);

  return (
    <div className='flex w-full md:ml-[250px]'>
      <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 w-full p-2'>
        {products.filter(product => selectedCategory === '' || selectedCategory === product.category.toLowerCase()).map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className='border p-4 min-h-[270px] shadow-md rounded-md hover:scale-105 transition max-w-[300px]'>
              <div className='relative size-[150px]'>
                <Image src={product.thumbnail} alt='no image' fill sizes='(max-width: 768px) 100px, 150px' />
              </div>
              <h2 className='line-clamp-2 text-sm text-gray-500 mb-2'>{product.title}</h2>
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const Home = () => {
  return (
    <div className='md:flex w-full'>
      <SearchProvider>
        <SearchSidebar />
        <HomeChild />
      </SearchProvider>
    </div>
  )
}

export default Home;

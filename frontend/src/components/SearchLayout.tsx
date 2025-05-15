'use client';
import { useState, useEffect, ReactNode } from 'react';
import { Search } from 'lucide-react';
import { SearchProvider, useSearchContext } from '@/context/SearchContext';

type Props = {
  children: React.ReactNode;
}

const SearchLayout = ({ children }: Props) => {

  const {
    search,
    setSearch,
    searchInput,
    setSearchInput,
    categories,
    handleCategory,
    handleResetFilter
  } = useSearchContext();

  const categoriesList = [
    'beauty',
    'apparel',
    'fragrances',
    'gadget',
    'kitchen',
    'outdoors',
    'furniture',
    'books',
    'groceries'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchInput);
  }

  return (
    <div className='flex p-4 w-full'>
      <div className='p-2 border-r w-1/4'>
        <form onSubmit={handleSubmit} className='flex justify-center items-center mt-4'>
          <input type="text" value={searchInput} onChange={handleChange} placeholder='Search...' className='shadow-[0_0_1px] rounded-3xl w-full py-2 pl-4 pr-9' />
          <button className='-translate-x-8 cursor-pointer'><Search /></button>
        </form>

        <div>
          <div className='flex justify-between pr-4 my-6'>
            <h2 className='text-2xl'>Categories</h2>
            <button onClick={handleResetFilter} className='py-2 px-4 bg-gray-300 rounded-lg cursor-pointer hover:scale-110 transition'>Reset</button>
          </div>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            {categoriesList.map((category) => (
              <div key={category} onClick={() => handleCategory(category)} className={`p-4 rounded-lg cursor-pointer max-w-[150px] hover:scale-110 transition ${categories.includes(category) ? 'bg-black text-white' : 'bg-gray-300'}`}>{category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='w-full'>
        {children}
      </div>
    </div>
  )
}

export default SearchLayout;
'use client';
import { Search } from 'lucide-react';
import { useSearchContext } from '@/context/SearchContext';

const SearchSidebar = () => {

  const {
    searchInput,
    setSearchInput,
    selectedCategory,
    handleCategory,
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

  return (
    <div className='px-4 md:w-64 fixed z-100 bg-white max-md:w-full transition h-auto'>
      <form method='GET' action='/products' className='flex justify-center items-center md:mt-4'>
        <input type="text" value={searchInput} name='search' onChange={handleChange} placeholder='Search...' className='shadow-[0_0_1px] rounded-3xl w-full py-2 pl-4 pr-9' />
        <button className='-translate-x-8 cursor-pointer'><Search /></button>
      </form>

      <div>
        <div className='flex justify-between pr-4 md:my-4 max-md:my-2'>
          <h2 className='text-2xl'>Categories</h2>
        </div>
        <div className='md:grid grid-cols-2 gap-4 mt-4 flex max-md:overflow-scroll max-md:pb-4'>
          {categoriesList.map((category) => (
            <div key={category} onClick={() => handleCategory(category)} className={`p-4 rounded-lg cursor-pointer max-w-[150px] hover:scale-110 transition ${selectedCategory === category ? 'bg-black text-white' : 'bg-gray-300'}`}>{category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchSidebar;
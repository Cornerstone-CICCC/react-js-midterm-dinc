'use client';
import { Search } from 'lucide-react';
import { useSearchContext } from '@/context/SearchContext';
import { useRouter } from 'next/navigation';

const SearchSidebar = () => {

  const router = useRouter();

  const {
    setSearch,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchInput);

    if (searchInput.trim() === '') {
      router.push('/');
    } else {
      router.push(`/?search=${encodeURIComponent(searchInput)}`);
    }
  }

  return (
    <div className='flex p-4 md:w-65 md:fixed bg-white sm:w-full'>
      <div className='p-2 border-r w-full max-md: transition'>
        <form onSubmit={handleSubmit} className='flex justify-center items-center mt-4'>
          <input type="text" value={searchInput} onChange={handleChange} placeholder='Search...' className='shadow-[0_0_1px] rounded-3xl w-full py-2 pl-4 pr-9' />
          <button className='-translate-x-8 cursor-pointer'><Search /></button>
        </form>

        <div>
          <div className='flex justify-between pr-4 my-6'>
            <h2 className='text-2xl'>Categories</h2>
          </div>
          <div className='md:grid grid-cols-2 gap-4 mt-4 flex max-md:overflow-scroll'>
            {categoriesList.map((category) => (
              <div key={category} onClick={() => handleCategory(category)} className={`p-4 rounded-lg cursor-pointer max-w-[150px] hover:scale-110 transition ${selectedCategory === category ? 'bg-black text-white' : 'bg-gray-300'}`}>{category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchSidebar;
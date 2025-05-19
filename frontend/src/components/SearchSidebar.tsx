'use client';
import { Search } from 'lucide-react';
import { useSearchContext } from '@/context/SearchContext';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { tilteToSlug } from '@/lib/utils';

const SearchSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';
  const { searchInput, setSearchInput, selectedCategory, handleCategory } =
    useSearchContext();

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery, setSearchInput]);

  const categoriesList = [
    'beauty',
    'apparel',
    'fragrances',
    'gadget',
    'kitchen',
    'outdoors',
    'furniture',
    'books',
    'groceries',
  ];

  const handleChange = (
    param: string,
    e: React.ChangeEvent<HTMLInputElement> | string,
  ) => {
    const value = typeof e === 'string' ? (e as string) : e.target.value.trim();
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (param === 'category') {
      if (value === selectedCategory) {
        current.delete('category');
      } else {
        current.set(param, value);
      }
    } else {
      if (!value) {
        current.delete(param);
      } else {
        current.set(param, value);
      }
    }

    const qString = current.toString();
    const query = qString ? `?${qString}` : '';

    router.replace(`/${query}`);
    return;
  };

  return (
    <div className="px-4 md:w-64 fixed z-100 bg-white max-md:w-full transition h-auto">
      <form
        method="GET"
        action="/"
        className="flex justify-center items-center md:mt-4"
        // onSubmit={(e) => {
        //   e.preventDefault();
        // }}
      >
        <input
          type="text"
          value={searchInput}
          name="search"
          onChange={(e) => {
            setSearchInput(e.target.value);
            handleChange('search', e);
          }}
          placeholder="Search..."
          className="shadow-[0_0_1px] rounded-3xl w-full py-2 pl-4 pr-9"
        />
        <button className="-translate-x-8 cursor-pointer">
          <Search />
        </button>
      </form>

      <div>
        <div className="flex justify-between pr-4 md:my-4 max-md:my-2">
          <h2 className="text-2xl">Categories</h2>
        </div>
        <div className="md:grid grid-cols-2 gap-4 mt-4 flex max-md:overflow-scroll max-md:pb-4">
          {categoriesList.map((category) => (
            <div
              key={category}
              onClick={() => {
                handleCategory(category);
                handleChange('category', tilteToSlug(category));
              }}
              className={`p-4 rounded-lg cursor-pointer max-w-[150px] hover:scale-110 transition ${selectedCategory === category ? 'bg-black text-white' : 'bg-gray-300'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSidebar;

'use client';
import { useSearchContext } from '@/context/SearchContext';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CATEGORIES } from '@/constants/categories';
import { titleToSlug } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const SearchSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';
  const { searchValue, setSearchValue, selectedCategory, handleCategory } =
    useSearchContext();

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery, setSearchValue]);

  useEffect(() => {
    if (categoryQuery) {
      handleCategory(categoryQuery);
    }
  }, [categoryQuery]);

  const handleChange = (
    param: string,
    e: React.ChangeEvent<HTMLInputElement> | string,
  ) => {
    const value = typeof e === 'string' ? (e as string) : e.target.value.trim();
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (param === 'category') {
      if (value === titleToSlug(selectedCategory)) {
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
      <div className="flex justify-between gap-1">
        <Input
          placeholder="Search..."
          value={searchValue}
          className="p-4"
          name="search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
            handleChange('search', e);
          }}
        />
        <Button size={'icon'} variant={'secondary'}>
          <SearchIcon />
        </Button>
      </div>

      <div>
        <div className="flex justify-between pr-4 md:my-4 max-md:my-2">
          <h2 className="text-2xl">Categories</h2>
        </div>
        <div className="mt-4 flex md:block max-md:overflow-scroll max-md:pb-4 md:-m-1.5">
          {CATEGORIES.map((cate) => (
            <Button
              key={cate}
              variant={
                titleToSlug(categoryQuery) === titleToSlug(cate)
                  ? 'default'
                  : 'secondary'
              }
              size={'sm'}
              className={'m-1.5'}
              onClick={() => {
                handleCategory(titleToSlug(cate));
                handleChange('category', titleToSlug(cate));
              }}
            >
              {cate}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSidebar;

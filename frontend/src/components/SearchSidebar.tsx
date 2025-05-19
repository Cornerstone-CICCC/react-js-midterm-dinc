'use client';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CATEGORIES } from '@/constants/categories';
import { useState } from 'react';

const SearchSidebar = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="md:w-60 fixed z-5 bg-white max-md:w-full transition h-auto pr-5">
      <div className="flex justify-between gap-1">
        <Input
          placeholder="Search..."
          value={searchValue}
          className="p-4"
          name="search"
          onChange={handleChange}
        />
        <Button size={'icon'} variant={'secondary'}>
          <SearchIcon />
        </Button>
      </div>

      <div>
        <div className="flex justify-between pr-4 md:my-4 max-md:my-2">
          <h2 className="text-2xl">Categories</h2>
        </div>
        <div className="md:grid grid-cols-2 gap-4 mt-4 flex max-md:overflow-scroll max-md:pb-4">
          {CATEGORIES.map((cate) => (
            <Button
              key={cate}
              variant={'secondary'}
              size={'sm'}
              className="text-xs truncate"
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

'use client';
import { useSearchParams, useRouter } from 'next/navigation';
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

  const handleQueryParam = (param: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (param !== 'category') {
      current.set(param, value);
    }
    if (param === 'category') {
      if (titleToSlug(categoryQuery) === titleToSlug(value)) {
        current.delete('category');
      } else {
        current.set(param, titleToSlug(value));
      }
    }
    const qString = current.toString();
    const query = qString ? `?${qString}` : '';
    router.replace(`/${query}`);
  };

  return (
    <div className="px-4 z-100 bg-white sticky top-0 pt-1 h-36 md:h-2/3 md:max-w-72 md:top-16 md:w-full transition">
      <div className="flex justify-between gap-1 mt-4 md:mt-0">
        <Input
          placeholder="Search..."
          value={searchQuery}
          className="p-4"
          name="search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleQueryParam('search', e.target.value);
          }}
        />
        <Button size={'icon'} variant={'secondary'}>
          <SearchIcon />
        </Button>
      </div>

      <div>
        <div className="flex justify-between pr-4 md:my-4 max-md:my-2">
          <h2 className="text-sm font-bold md:text-2xl">Categories</h2>
        </div>
        <div className="md:mt-4 flex md:block max-md:overflow-scroll max-md:pb-4 md:-m-1.5">
          {CATEGORIES.map((cate) => (
            <Button
              key={cate}
              variant={
                titleToSlug(categoryQuery) === titleToSlug(cate)
                  ? 'default'
                  : 'secondary'
              }
              size={'sm'}
              className={
                'first-of-type:m-0 mx-1.5 md:mb-1.5 md:first-of-type:mx-1.5'
              }
              onClick={() => {
                handleQueryParam('category', cate);
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

'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type SearchContextType = {
  search: string;
  setSearch: (value: string) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
  categories: string[];
  handleCategory: (category: string) => void;
  handleResetFilter: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  const handleCategory = (category: string) => {
    setCategories((prevState) =>
      prevState.includes(category)
        ? prevState.filter((cat) => cat !== category)
        : [...prevState, category]
    );
  };

  const handleResetFilter = () => {
    setCategories([]);
    setSearch('');
    setSearchInput('');
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        searchInput,
        setSearchInput,
        categories,
        handleCategory,
        handleResetFilter,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
}

export { SearchProvider, useSearchContext };

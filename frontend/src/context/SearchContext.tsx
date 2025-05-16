'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type SearchContextType = {
  search: string;
  setSearch: (value: string) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
  selectedCategory: string;
  handleCategory: (category: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        searchInput,
        setSearchInput,
        selectedCategory,
        handleCategory,
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

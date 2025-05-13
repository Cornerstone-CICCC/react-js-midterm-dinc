'use client';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Product } from '@/types/product';
import Link from 'next/link';


const Home = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([])

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

  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    setProducts(data.products);
    console.log(data.products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchInput);
    setSearchInput('');
  }

  const handleCategory = (category: string) => {
    setCategories(prevState => (
      prevState.includes(category) ? prevState.filter(cat => cat !== category) : [...prevState, category]
    ))
  }

  const handleResetFilter = () => {
    setCategories([]);
    setSearch('');
    setSearchInput('');
    console.log(categories)
  }

  return (
    <div className='flex'>
      <div className='p-2 border-r w-1/4'>
        <form onSubmit={handleSubmit} className='flex justify-center items-center mt-4'>
          <input type="text" value={searchInput} onChange={handleChange} placeholder='Search...' className='shadow-[0_0_1px] rounded-3xl w-100 py-2 pl-4' />
          <button className='-translate-x-8'><Search /></button>
        </form>

        <div>
          <h2 className='text-3xl mt-4'>Categories</h2>
          <div className='grid grid-cols-3 gap-4 mt-4'>
            {categoriesList.map((category) => (
              <div key={category} onClick={() => handleCategory(category)} className={`p-4 rounded-lg text-center cursor-pointer hover:scale-110 transition ${categories.includes(category) ? 'bg-black text-white' : 'bg-gray-300'}`}>{category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
            ))}
          </div>
          <div>
            <button onClick={handleResetFilter} className='py-2 px-4 bg-gray-300 rounded-lg mt-6 cursor-pointer hover:scale-110 transition'>Reset</button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-4 gap-4 mt-4'>
        {products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()) && (categories.length === 0 || categories.some(category => product.category.toLowerCase().includes(category.toLowerCase())))).map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className='border p-4'>
              <img src={product.thumbnail} alt='no image' />
              <h2>{product.title}</h2>
              {/* <p>{product.description}</p> */}
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home;

'use client';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Product } from '@/types/product';


const Home = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([])

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
    // const searchInput = e.currentTarget.elements[0] as HTMLInputElement;
    setSearch(searchInput);
    setSearchInput('');
  }

  const handleCategory = (category: string) => {
    setCategories(prevState => (
      prevState.includes(category) ? prevState.filter(cat => cat !== category) : [...prevState, category]
    ))

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
            <div onClick={() => handleCategory('beauty')} className={`p-4 rounded-lg text-center hover:scale-110 transition ${categories.includes('beauty') ? 'bg-black text-white' : 'bg-gray-300'}`}>Beauty</div>
            <div onClick={() => handleCategory('apparel')} className={`p-4 rounded-lg text-center hover:scale-110 transition ${categories.includes('apparel') ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Apparel</div>
            <div onClick={() => handleCategory('fragrances')} className={`p-4 rounded-lg text-center hover:scale-110 transition ${categories.includes('fragrances') ? 'bg-black text-white' : 'bg-gray-300'}`}>Fragrances</div>
            <div onClick={() => handleCategory('gadget')} className={`p-4 rounded-lg text-center hover:scale-110 transition ${categories.includes('gadget') ? 'bg-black text-white' : 'bg-gray-300'}`}>Gadget</div>
            <div onClick={() => handleCategory('kitchen')} className={`p-4 rounded-lg text-center hover:scale-110 transition ${categories.includes('kitchen') ? 'bg-black text-white' : 'bg-gray-300'}`}>Kitchen</div>
            <div onClick={() => handleCategory('outdoors')} className={`p-4 rounded-lg text-center hover:scale-110 transition ${categories.includes('outdoors') ? 'bg-black text-white' : 'bg-gray-300'}`}>Outdoors</div>
            <div onClick={() => handleCategory('furniture')} className={`p-4 rounded-lg text-center hover:scale-110 transition ${categories.includes('furniture') ? 'bg-black text-white' : 'bg-gray-300'}`}>Furniture</div>
            <div onClick={() => handleCategory('books')} className={`p-4 rounded-lg text-center hover:scale-110 transition ${categories.includes('books') ? 'bg-black text-white' : 'bg-gray-300'}`}>Books</div>
            <div onClick={() => handleCategory('groceries')} className={`p-4 rounded-lg text-center hover:scale-110 transition ${categories.includes('groceries') ? 'bg-black text-white' : 'bg-gray-300'}`}>Groceries</div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-4 gap-4 mt-4'>
        {products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()) && (categories.length === 0 || categories.some(category => product.category.toLowerCase().includes(category.toLowerCase())))).map((product) => (
          <div key={product.id} className='border p-4'>
            <img src={product.thumbnail} alt='no image' />
            <h2>{product.title}</h2>
            {/* <p>{product.description}</p> */}
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;

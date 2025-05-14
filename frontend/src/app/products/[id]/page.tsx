'use client';

import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SearchLayout from "@/components/SearchLayout";
import { SearchProvider, useSearchContext } from "@/context/SearchContext";

const ProductDetail = () => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    title: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    thumbnail: '',
  });
  const params = useParams();
  const id = params?.id;



  useEffect(() => {
    if (!id) return;
    const fetchProducts = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      console.log(data);
    }
    fetchProducts();
  }, [id]);

  return (
    <SearchProvider>
      <div className="flex flex-col items-center justify-center p-4 w-full">
        <SearchLayout>
          <div className="w-70">
            <h2>{product.title}</h2>
            <img src={product.thumbnail || `https://via.placeholder.com/200x300`} alt={product.title} />
            <p>Category: {product.category}</p>
            <p>Product Description</p>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <div>
              <button className="p-4 rounded-lg bg-gray-400">Add to Cart</button>
            </div>
          </div>
        </SearchLayout>
      </div>
    </SearchProvider>
  )
}

export default ProductDetail;
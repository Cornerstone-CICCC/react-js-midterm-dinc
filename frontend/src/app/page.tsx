'use client';

import SearchSidebar from '@/components/SearchSidebar';
import { Product } from '@/types/product';
import ProductList from '@/components/product/product-list';

const products: Product[] = [
  {
    id: '1',
    userId: '1',
    name: 'Modern Table',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus inventore tenetur, provident repellat, omnis perspiciatis, nostrum quidem dolores blanditiis atque delectus accusantium veritatis eaque odit? Aliquid, nihil nostrum! Rem, porro.',
    price: 299,
    imageUrl: '/product1.png',
    categoryId: 'home',
    status: true,
    createdAt: '2025-02-19T22:46:11.813532',
    updatedAt: '2025-05-18T22:46:11.813550',
  },
  {
    id: '2',
    userId: '2',
    name: 'Coffee',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus inventore tenetur, provident repellat, omnis perspiciatis, nostrum quidem dolores blanditiis atque delectus accusantium veritatis eaque odit? Aliquid, nihil nostrum! Rem, porro.',
    price: 299,
    imageUrl: '/product2.png',
    categoryId: 'home',
    status: true,
    createdAt: '2025-02-19T22:46:11.813532',
    updatedAt: '2025-05-18T22:46:11.813550',
  },
  {
    id: '3',
    userId: '2',
    name: 'Coffee',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus inventore tenetur, provident repellat, omnis perspiciatis, nostrum quidem dolores blanditiis atque delectus accusantium veritatis eaque odit? Aliquid, nihil nostrum! Rem, porro.',
    price: 299,
    imageUrl: '/product2.png',
    categoryId: 'home',
    status: true,
    createdAt: '2025-02-19T22:46:11.813532',
    updatedAt: '2025-05-18T22:46:11.813550',
  },
  {
    id: '4',
    userId: '3',
    name: 'Coffee',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus inventore tenetur, provident repellat, omnis perspiciatis, nostrum quidem dolores blanditiis atque delectus accusantium veritatis eaque odit? Aliquid, nihil nostrum! Rem, porro.',
    price: 299,
    imageUrl: '/product2.png',
    categoryId: 'home',
    status: true,
    createdAt: '2025-02-19T22:46:11.813532',
    updatedAt: '2025-05-18T22:46:11.813550',
  },
  {
    id: '5',
    userId: '6',
    name: 'Coffee',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus inventore tenetur, provident repellat, omnis perspiciatis, nostrum quidem dolores blanditiis atque delectus accusantium veritatis eaque odit? Aliquid, nihil nostrum! Rem, porro.',
    price: 299,
    imageUrl: '/product3.png',
    categoryId: 'home',
    status: true,
    createdAt: '2025-02-19T22:46:11.813532',
    updatedAt: '2025-05-18T22:46:11.813550',
  },
  {
    id: '6',
    userId: '6',
    name: 'Coffee',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus inventore tenetur, provident repellat, omnis perspiciatis, nostrum quidem dolores blanditiis atque delectus accusantium veritatis eaque odit? Aliquid, nihil nostrum! Rem, porro.',
    price: 299,
    imageUrl: '/product3.png',
    categoryId: 'home',
    status: true,
    createdAt: '2025-02-19T22:46:11.813532',
    updatedAt: '2025-05-18T22:46:11.813550',
  },
];

const Home = () => {
  return (
    <div className="md:flex w-full pt-10 px-3 md:pt-20 md:px-5">
      <SearchSidebar />
      <div className="flex w-full md:ml-[250px] pb-6">
        <div className="w-full mt-40 md:mt-0">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default Home;

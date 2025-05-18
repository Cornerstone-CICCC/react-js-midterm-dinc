'use client';

import ProfileUI from '@/components/profile/profile-ui';
import ProfileSkeleton from '@/components/profile/profile-skeleton';
import { Product } from '@/types/product';
import { Suspense } from 'react';
import useUserStore from '@/stores/useUserStore';

const MyProfilePage = () => {
  const { user } = useUserStore();

  if (!user) {
    return <ProfileSkeleton isOwnProfile={true} />;
  }

  // TODO: get products
  const products: Product[] = [
    {
      id: '1',
      name: 'Producttttttttttttttttttttttttttttttttttttttttttttttttttttt 1',
      description: 'Product 1 description',
      price: 100,
      imageUrl: '/test.jpeg',
      categoryId: '1',
      userId: '1',
      status: true,
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Product 2 description',
      price: 200,
      imageUrl: '/test.jpeg',
      categoryId: '1',
      userId: '1',
      status: true,
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
    {
      id: '3',
      name: 'Product 2',
      description: 'Product 2 description',
      price: 200,
      imageUrl: '/test.jpeg',
      categoryId: '1',
      userId: '1',
      status: true,
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
  ];

  return (
    <div className="px-0 sm:px-10 lg:px-16 py-0">
      <Suspense fallback={<ProfileSkeleton isOwnProfile={true} />}>
        <ProfileUI user={user} isOwnProfile={true} products={products} />
      </Suspense>
    </div>
  );
};

export default MyProfilePage;

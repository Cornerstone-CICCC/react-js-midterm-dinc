'use client';

import ProfileUI from '@/components/profile/profile-ui';
import ProfileSkeleton from '@/components/profile/profile-skeleton';
import { Product } from '@/types/product';
import { Suspense, use } from 'react';

type PageParams = {
  userId: string;
};

const UserPage = ({ params }: { params: Promise<PageParams> }) => {
  const resolvedParams = use(params);
  const { userId } = resolvedParams;

  // TODO: get user
  const user = {
    id: userId,
    name: 'John Doe',
    userName: 'johndoe',
    location: 'Vancouver, BC, Canada',
    email: 'john.doe@example.com',
    bio: 'I am a software engineer',
  };

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
  ];

  return (
    <div className="px-0 sm:px-10 lg:px-16 py-0">
      <Suspense fallback={<ProfileSkeleton isOwnProfile={false} />}>
        <ProfileUI user={user} isOwnProfile={false} products={products} />
      </Suspense>
    </div>
  );
};

export default UserPage;

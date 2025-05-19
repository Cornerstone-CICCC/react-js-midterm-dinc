'use client';

import ProfileUI from '@/components/profile/profile-ui';
import ProfileSkeleton from '@/components/profile/profile-skeleton';
import { Product } from '@/types/product';
import { Suspense, use } from 'react';
import { useUser } from '@/hooks/useUser';

type PageParams = {
  userId: string;
};

const UserPage = ({ params }: { params: Promise<PageParams> }) => {
  const resolvedParams = use(params);
  const { userId } = resolvedParams;
  const { userData, isLoading, isError } = useUser(userId);

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

  if (!userData || isError) {
    return <div>User not found</div>;
  }

  if (isLoading) {
    return <ProfileSkeleton isOwnProfile={false} />;
  }

  return (
    <div className="px-0 sm:px-10 lg:px-16 py-14">
      <Suspense fallback={<ProfileSkeleton isOwnProfile={false} />}>
        <ProfileUI user={userData} isOwnProfile={false} products={products} />
      </Suspense>
    </div>
  );
};

export default UserPage;

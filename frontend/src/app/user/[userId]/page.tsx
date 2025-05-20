'use client';
import ProfileUI from '@/components/profile/profile-ui';
import ProfileSkeleton from '@/components/profile/profile-skeleton';
import { Suspense, use, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';

type PageParams = {
  userId: string;
};

const UserPage = ({ params }: { params: Promise<PageParams> }) => {
  const resolvedParams = use(params);
  const { userId } = resolvedParams;
  const { userData, isLoading, isError } = useUser(userId);

  useEffect(() => {
    if (userData) {
      document.title = `${userData?.name} - DINCT`;
    } else {
      document.title = `User Profile - DINCT`;
    }
  }, [document.title, userData]);

  if (!userData || isError) {
    return <div>User not found</div>;
  }

  if (isLoading) {
    return <ProfileSkeleton isOwnProfile={false} />;
  }

  return (
    <div className="px-0 sm:px-10 lg:px-16 py-14">
      <Suspense fallback={<ProfileSkeleton isOwnProfile={false} />}>
        <ProfileUI user={userData} isOwnProfile={false} />
      </Suspense>
    </div>
  );
};

export default UserPage;

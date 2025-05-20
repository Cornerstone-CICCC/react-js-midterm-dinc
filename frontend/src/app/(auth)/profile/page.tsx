'use client';
import Head from 'next/head';
import ProfileUI from '@/components/profile/profile-ui';
import ProfileSkeleton from '@/components/profile/profile-skeleton';
import { Suspense, useEffect } from 'react';
import useUserStore from '@/stores/useUserStore';

const MyProfilePage = () => {
  const pageTitle = 'Profile - DINCT';
  const { user } = useUserStore();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = pageTitle;
    }
  }, [pageTitle]);

  if (!user) {
    return <ProfileSkeleton isOwnProfile={true} />;
  }

  return (
    <div className="px-0 sm:px-10 lg:px-16 py-14">
      <Head>
        <title>{document.title}</title>
      </Head>
      <Suspense fallback={<ProfileSkeleton isOwnProfile={true} />}>
        <ProfileUI user={user} isOwnProfile={true} />
      </Suspense>
    </div>
  );
};

export default MyProfilePage;

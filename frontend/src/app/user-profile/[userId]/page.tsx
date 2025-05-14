'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  bio: string;
  profileImage: string;
}

// Mock data
const mockUserProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  username: 'johndoe',
  bio: 'Software Engineer | Coffee Lover | Travel Enthusiast',
  profileImage: '/next.svg',
};

const UserProfilePage = () => {
  const params = useParams();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(
    mockUserProfile,
  );
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    // Simulating API call with mock data
    const fetchUserProfile = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUserProfile(mockUserProfile);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [params.userId]);

  const handleEditProfile = () => {
    router.push(`/user-profile/edit`);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 gap-10">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src={userProfile.profileImage}
                alt={`${userProfile.name}'s profile picture`}
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <div className="flex-1 max-w-xl text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                {userProfile.name}
              </h1>
              <p className="text-xl text-gray-600 mt-1">
                {userProfile.username}
              </p>
              <p className="mt-4 text-gray-700">{userProfile.bio}</p>
            </div>
            <Button onClick={handleEditProfile}>Edit Profile</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        <ProductCard
          image="/test.jpeg"
          name="Mens T-Shirt"
          price={100}
          status={true}
          onClick={() => handleProductClick('1')}
          isLoading={isLoading}
        />
        <ProductCard
          image="/test.jpeg"
          name="Mens T-Shirt"
          price={100}
          status={false}
          onClick={() => handleProductClick('2')}
          isLoading={isLoading}
        />
        <ProductCard
          image="/test.jpeg"
          name="Mens T-Shirt"
          price={100}
          status={true}
          onClick={() => handleProductClick('3')}
          isLoading={isLoading} 
        />
        <ProductCard
          image="/test.jpeg"
          name="Mens T-Shirt"
          price={100}
          status={true}
          onClick={() => handleProductClick('4')}
          isLoading={isLoading}
        />
        <ProductCard
          image="/test.jpeg"
          name="Mens T-Shirt"
          price={100}
          status={true}
          onClick={() => handleProductClick('5')}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default UserProfilePage;

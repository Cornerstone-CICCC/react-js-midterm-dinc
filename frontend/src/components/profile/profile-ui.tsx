'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { User } from '@/types/user';
import { useState } from 'react';
import ProductList from '@/components/product/product-list';

interface ProfileUIProps {
  user: User;
  isOwnProfile: boolean;
}

const ProfileUI = ({ user, isOwnProfile }: ProfileUIProps) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const mobileMaxLength = 50;

  const handleEditProfile = () => {
    router.push(`/profile/edit`);
  };

  const toggleBio = () => {
    setIsExpanded(!isExpanded);
  };

  const displayBio =
    user.bio &&
    user.bio.length > (isExpanded ? maxLength : mobileMaxLength) &&
    !isExpanded
      ? `${user.bio.slice(0, mobileMaxLength)}...`
      : user.bio;

  return (
    <div>
      {/* Profile Section */}
      <div className="border-b border-gray-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-5">
          <div className="flex items-center justify-center gap-5 md:gap-10">
            <div className="relative w-24 h-24 lg:w-40 lg:h-40">
              <Image
                src={user.fileId || '/default-profile.png'}
                alt={`${user.name}'s profile picture`}
                fill
                className="rounded-full object-cover shadow-lg"
              />
            </div>
            <div className="flex-1 max-w-xl text-left">
              <div className="flex flex-col gap-1 md:gap-2">
                <h1 className="text-lg md:text-3xl font-bold">{user.name}</h1>
                <p className="text-sm md:text-base text-gray-500">
                  {user.userName}
                </p>
                <p className="text-sm md:text-base font-semibold">
                  {user.location}
                </p>
                {isOwnProfile && (
                  <div className="md:hidden">
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={handleEditProfile}
                    >
                      Edit Profile
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {isOwnProfile && (
              <div className="hidden md:block">
                <Button variant="secondary" onClick={handleEditProfile}>
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
          <div className="px-0 md:px-5 max-w-3xl text-sm md:text-base text-left">
            <p>{displayBio}</p>
            {user.bio && user.bio.length > mobileMaxLength && (
              <Button
                onClick={toggleBio}
                variant="link"
                className="text-sm font-medium self-start p-0 h-auto underline"
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Product List Section */}
      <div className="mx-auto py-2 lg:py-8">
        <ProductList
          userId={user.id}
          noResultsText={
            isOwnProfile ? (
              <div>
                The artists canvas is still blank… <br />
              </div>
            ) : (
              <div>
                No masterpieces found! <br />
                Try exploring other categories.
              </div>
            )
          }
        />
      </div>
    </div>
  );
};

export default ProfileUI;

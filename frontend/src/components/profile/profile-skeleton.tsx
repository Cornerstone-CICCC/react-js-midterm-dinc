import { Skeleton } from '../ui/skeleton';

interface ProfileSkeletonProps {
  isOwnProfile: boolean;
} 

const ProfileSkeleton = ({ isOwnProfile }: ProfileSkeletonProps) => {
  return (
    <div>
      {/* Profile Section Skeleton */}
      <div className="border-b border-gray-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-5">
          <div className="flex items-center justify-center gap-5 md:gap-10">
            {/* Profile Picture Skeleton */}
            <div className="relative w-24 h-24 lg:w-40 lg:h-40">
              <Skeleton className="w-full h-full rounded-full shadow-lg" />
            </div>

            {/* Profile Info Skeleton */}
            <div className="flex-1 max-w-xl text-left">
              <div className="flex flex-col gap-1 md:gap-2">
                <Skeleton className="h-8 w-48 md:h-12" />
                <Skeleton className="h-5 w-32 md:h-6" />
                <Skeleton className="h-5 w-40 md:h-6" />
                {isOwnProfile && (
                  <div className="md:hidden">
                    <Skeleton className="h-9 w-full" />
                  </div>
                )}
              </div>
            </div>
            {isOwnProfile && (
              <div className="hidden md:block">
                <Skeleton className="h-9 w-32" />
              </div>
            )}
          </div>

          {/* Bio Skeleton */}
          <div className="px-0 md:px-5 max-w-3xl">
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-24 mt-2" />
          </div>
        </div>
      </div>

      {/* Product List Skeleton */}
      <div className="mx-auto py-0 lg:py-8">
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="hidden sm:block">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;

import { Skeleton } from '../ui/skeleton';

const ProductSkeleton = () => {
  return (
    <div className="p-5 md:p-20">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="">
          {/** Product images Skeleton */}
          <div className="space-y-3">
            <div className="h-[400px] w-[400px] md:h-[500px] md:w-[500px] relative mx-auto">
              <Skeleton className="w-full h-full shadow-lg" />
            </div>
            <div className="flex gap-3 justify-end w-[400px] md:w-[500px] mx-auto">
              {[1, 2, 3, 4].map((url, i) => (
                <Skeleton key={i} className="size-20 relative" />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4 w-full">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-10" />
          <div className="space-y-1">
            <Skeleton className="h-6 w-1/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-15" />
              <Skeleton className="h-5 w-15" />
            </div>
          </div>
          <div className="space-y-4 mt-8 p-4 bg-zinc-50 rounded-sm">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="w-full flex items-center space-x-4 mt-4 p-4 bg-zinc-50 rounded-sm">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-1/4 h-8" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;

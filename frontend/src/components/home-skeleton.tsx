import { Skeleton } from './ui/skeleton';

const HomeSkeleton = () => {
  return (
    <div className="md:flex w-full pt-10 px-3 md:pt-20 md:px-5">
      <div className="md:w-60 fixed z-5 bg-white max-md:w-full transition h-auto pr-5">
        <div className="flex justify-between gap-1">
          <Skeleton className="w-5/6 h-8" />
          <Skeleton className="w-1/6 h-8" />
        </div>

        <div>
          <div className="flex justify-between pr-4 md:my-4 max-md:my-2">
            <Skeleton className="w-3/4 h-10" />
          </div>
          <div className="md:grid grid-cols-2 gap-4 mt-4 flex max-md:overflow-scroll max-md:pb-4">
            {[...Array(15)].map((_, index) => (
              <Skeleton key={index} className="w-full h-6" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full md:ml-[250px] pb-6">
        <div className="w-full mt-40 md:mt-0">
          <div className="">
            <div className="mx-auto py-0">
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
                {[...Array(20)].map((_, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <div className="hidden sm:flex sm:flex-col sm:gap-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-5 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;

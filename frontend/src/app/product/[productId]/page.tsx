'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DotIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { useWork } from '@/hooks/useWork';
import useUserStore from '@/stores/useUserStore';
import { slugToTitle } from '@/lib/utils';
import ProductSkeleton from '@/components/product/product-detail-skeleton';

type PageParams = {
  productId: string;
};

const ProductDetail = ({ params }: { params: Promise<PageParams> }) => {
  const resolvedParams = use(params);
  const { productId } = resolvedParams;
  const { user } = useUserStore();
  const { data, error, isFetching } = useWork(productId);
  const [currentImg, setCurrentImg] = useState<string>('');
  const isOwner = data?.user?.id === user?.id;

  useEffect(() => {
    document.title = `${data?.name} - DINCT`;
  }, [document.title, data]);

  useEffect(() => {
    if (data?.imageUrls && data.imageUrls.length > 0) {
      console.log(data.imageUrls);
      setCurrentImg(data.imageUrls[0]);
    }
  }, [data]);

  const handleImageChange = (url: string) => {
    setCurrentImg(url);
  };

  if (isFetching) {
    return <ProductSkeleton />;
  }

  if (error || !data) {
    return <div>Error: {error?.message || 'Failed to load product'}</div>;
  }

  const target = new Date(data.updatedAt).getTime();
  const today = Date.now();
  const diff = Math.floor(today - target);

  const diffInMinutes = Math.floor(diff / (1000 * 60));
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  const listedDate =
    diffInMinutes < 60
      ? `${diffInMinutes} minutes ago`
      : diffInHours < 24
        ? `${diffInHours} hours ago`
        : `${diffInDays} days ago`;

  return (
    <div className="p-5 md:p-15">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="">
          <div className="space-y-3">
            <div className="h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] relative mx-auto bg-zinc-100">
              {currentImg && (
                <Image
                  src={currentImg}
                  alt={data.name}
                  fill
                  className="bg-zinc-100 object-contain"
                />
              )}
            </div>
            <div className="flex gap-3 justify-end w-[300px] sm:w-[400px] md:w-[500px] mx-auto">
              {data.imageUrls?.map((url, i) => (
                <button
                  key={i}
                  className={cn({
                    'bg-zinc-100 size-20 relative border-1 border-white': true,
                    'border-1 border-black': url === currentImg,
                  })}
                  onClick={() => handleImageChange(url)}
                >
                  {url && (
                    <Image
                      src={url}
                      alt={data.name}
                      fill
                      className="object-contain"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4 w-full">
          <h2 className="text-4xl font-bold">{data.name}</h2>
          <div className="flex gap-2">
            <Badge variant={'outline'}>{slugToTitle(data.categorySlug)}</Badge>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">$ {data.price}</div>
            <div className="text-sm text-muted-foreground flex items-center">
              <span>
                {data.user?.location
                  ? data.user.location
                  : 'No location provided'}
              </span>
              <DotIcon />
              <span>Listed {listedDate}</span>
            </div>
          </div>
          <div className="space-y-4 mt-8 p-4 bg-zinc-50 rounded-sm">
            <h3 className="text-lg font-bold">Details</h3>
            <div className="text-muted-foreground">
              <p>{data.description}</p>
            </div>
          </div>
          <div className="w-full flex items-center space-x-4 mt-4 p-4 bg-zinc-50 rounded-sm">
            <Avatar>
              <AvatarImage
                src={data.user?.fileId || '/default-profile.png'}
                alt={data.user?.name}
              />
            </Avatar>
            <p className="truncate font-semibold">
              <Link href={isOwner ? `/profile` : `/user/${data.user?.id}`}>
                {data.user?.name}
              </Link>
            </p>
          </div>

          {isOwner ? (
            <Button className="w-full" size={'lg'} asChild>
              <Link href={`/work/edit`}>
                <span className="uppercase">Edit</span>
              </Link>
            </Button>
          ) : data.status === 'active' ? (
            <Button className="w-full" size={'lg'} asChild>
              <Link href="/payment">
                <span className="uppercase">Purchase</span>
              </Link>
            </Button>
          ) : (
            <Button className="w-full" size={'lg'} disabled>
              <span className="uppercase">Soldout</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

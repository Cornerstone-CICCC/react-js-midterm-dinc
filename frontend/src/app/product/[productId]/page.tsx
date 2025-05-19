'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DotIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, use } from 'react';
import { useWork } from '@/hooks/useWork';
import useUserStore from '@/stores/useUserStore';
type PageParams = {
  productId: string;
};

const ProductDetail = ({ params }: { params: Promise<PageParams> }) => {
  const resolvedParams = use(params);
  const { productId } = resolvedParams;
  const { user } = useUserStore();

  const { productData, userData, error, isFetching } = useWork(productId);
  console.log(productData);

  const [currentImg, setCurrentImg] = useState<string>(
    productData?.imageUrls[0] || '',
  );

  const handleImageChange = (url: string) => {
    setCurrentImg(url);
  };

  // const today = Date.now() / 1000;
  // const diff = data?.updatedAt.getTime() / 1000;

  return (
    <div className="p-5 md:p-20">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="">
          <div className="space-y-3">
            <div className="h-[400px] w-[400px] md:h-[500px] md:w-[500px] relative mx-auto">
              <Image
                src={`/${currentImg}`}
                alt=""
                fill
                className="bg-zinc-100 object-contain"
              />
            </div>
            <div className="flex gap-3 justify-end w-[400px] md:w-[500px] mx-auto">
              {productData?.imageUrls.map((url, i) => (
                <button
                  key={i}
                  className={cn({
                    'bg-zinc-100 size-20 relative border-1 border-white': true,
                    'border-1 border-black': url === currentImg,
                  })}
                  onClick={() => handleImageChange(url)}
                >
                  <Image
                    src={`/${url}`}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">{productData?.name}</h2>
          <div className="flex gap-2">
            <Badge variant={'outline'}>{productData?.category}</Badge>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">$ {productData?.price}</div>
            <div className="text-sm text-muted-foreground flex items-center">
              <span>{userData?.location}</span>
              <DotIcon />
              <span>
                {/* Listed {Math.floor((today - diff) / (60 * 60 * 24))} days ago */}
              </span>
            </div>
          </div>
          <div className="space-y-4 mt-8 p-4 bg-zinc-50 rounded-sm">
            <h3 className="text-lg font-bold">Details</h3>
            <div className="text-muted-foreground">
              <p>{productData?.description}</p>
            </div>
          </div>
          <div className="w-full flex items-center space-x-4 mt-4 p-4 bg-zinc-50 rounded-sm">
            <Avatar>
              <AvatarImage src={userData?.fileId} alt="@shadcn" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <p className="truncate font-semibold">
              <Link href={`/user/${userData?.id}`}>{userData?.name}</Link>
            </p>
          </div>

          {userData?.id === user?.id ? (
            <Button className="w-full" size={'lg'} asChild>
              <Link href={`/work/edit/${productData?.id}`}>
                <span className="uppercase">Edit</span>
              </Link>
            </Button>
          ) : productData?.status === 'active' ? (
            <Button
              className="w-full"
              size={'lg'}
              asChild
            >
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

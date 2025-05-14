'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const imagesList = ['product1.png', 'product2.png', 'product3.png'];

const ProductDetail = () => {
  const [currentImg, setCurrentImg] = useState<string>(imagesList[0]);
  const handleImageChange = (url: string) => {
    setCurrentImg(url);
  };
  return (
    <div className="p-20">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="lg:w-1/2">
          <div className="space-y-3">
            <div className="h-[500px] relative">
              <Image
                src={`/${currentImg}`}
                alt=""
                fill
                className="bg-gray-300/80 object-contain"
              />
            </div>
            <div className="flex gap-3 justify-end">
              {imagesList.map((url, i) => (
                <button
                  key={i}
                  className={cn({
                    'bg-amber-200 size-20 relative border-1 border-white': true,
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
        <div className="lg:w-1/2 space-y-5">
          <h2 className="text-4xl font-bold">Modern Wooden Coffee Table</h2>
          <div className="flex gap-2">
            <Badge variant={'outline'}>Home</Badge>
          </div>
          <div className="text-2xl font-bold">$ 299.00</div>
          <div className="text-sm text-muted-foreground">
            Updated 3 days ago
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Details</h3>
            <div className="text-muted-foreground">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus inventore tenetur, provident repellat, omnis
                perspiciatis, nostrum quidem dolores blanditiis atque delectus
                accusantium veritatis eaque odit? Aliquid, nihil nostrum! Rem,
                porro.
              </p>
            </div>
          </div>
          <div className="w-full flex items-center space-x-4 mt-8">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <p className="truncate font-semibold">Seller name</p>
          </div>
          <Button className="w-full" size={'lg'} asChild>
            <Link href="/payment">Purchase</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;

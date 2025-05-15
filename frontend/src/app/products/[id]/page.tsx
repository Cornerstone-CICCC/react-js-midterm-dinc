'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const imagesList = ['product1.png', 'product2.png', 'product3.png'];

interface IProductItem {
  id: number;
  userId: number;
  title: string;
  description: string;
  price: number;
  category: string;
  status: 'available' | 'sold';
  createdAt: Date;
  updatedAt: Date;
}

const productItem: IProductItem = {
  id: 1,
  userId: 1,
  title: 'Modern Wooden Coffee Table',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus inventore tenetur, provident repellat, omnis perspiciatis, nostrum quidem dolores blanditiis atque delectus accusantium veritatis eaque odit? Aliquid, nihil nostrum! Rem, porro.',
  price: 299,
  category: 'Home',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const ProductDetail = () => {
  const [currentImg, setCurrentImg] = useState<string>(imagesList[0]);
  const handleImageChange = (url: string) => {
    setCurrentImg(url);
  };
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
              {imagesList.map((url, i) => (
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
        <div className=" space-y-5">
          <h2 className="text-4xl font-bold">{productItem.title}</h2>
          <div className="flex gap-2">
            <Badge variant={'outline'}>{productItem.category}</Badge>
          </div>
          <div className="text-2xl font-bold">$ {productItem.price}</div>
          <div className="text-sm text-muted-foreground">
            Updated 3 days ago
          </div>
          <div className="space-y-4 mt-8 p-4 bg-zinc-50 rounded-sm">
            <h3 className="text-lg font-bold">Details</h3>
            <div className="text-muted-foreground">
              <p>{productItem.description}</p>
            </div>
          </div>
          <div className="w-full flex items-center space-x-4 mt-4 p-4 bg-zinc-50 rounded-sm">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <p className="truncate font-semibold">
              <Link href={`/profile/${productItem.userId}`}>
                {productItem.userId}
              </Link>
            </p>
          </div>

          {/** below button will be show only when seller and user is same. */}
          <Button className="w-full" size={'lg'} asChild>
            <Link href={`/work/1/edit`}>
              <span className="uppercase">Edit</span>
            </Link>
          </Button>

          {productItem.status === 'available' ? (
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

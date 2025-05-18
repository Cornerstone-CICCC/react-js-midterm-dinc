'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DotIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useProductStore from '@/stores/useProductStore';
import { Product } from '@/types/product';
const imagesList = ['product1.png', 'product2.png', 'product3.png'];

const productItem: Product = {
  id: '126a203f-0f4c-4fd0-834b-29a3cb55efff',
  name: 'Full',
  price: 470,
  userId: '2881e4fd-e747-4904-98fc-ffaee1d53dd9',
  description: 'Central cup about good institution election.',
  imageUrl: '/product1.png',
  categoryId: 'fa1bb246-8d1c-4e81-99d4-52ed7721d1ee',
  status: true,
  createdAt: '2025-02-19T22:46:11.813532',
  updatedAt: '2025-05-18T22:46:11.813550',
};

const ProductDetail = () => {
  const [currentImg, setCurrentImg] = useState<string>(imagesList[0]);
  const handleImageChange = (url: string) => {
    setCurrentImg(url);
  };
  const today = Date.now() / 1000;
  const diff = productItem.updatedAt.getTime() / 1000;

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
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">{productItem.title}</h2>
          <div className="flex gap-2">
            <Badge variant={'outline'}>{productItem.category}</Badge>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">$ {productItem.price}</div>
            <div className="text-sm text-muted-foreground flex items-center">
              <span>{productItem.location}</span>
              <DotIcon />
              <span>
                Listed {Math.floor((today - diff) / (60 * 60 * 24))} days ago
              </span>
            </div>
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
              <Link href={`/user/${productItem.userId}`}>
                {productItem.userId}
              </Link>
            </p>
          </div>

          {/** below button will be show only when seller and user is same. */}
          <Button className="w-full" size={'lg'} asChild>
            <Link href={`/work/edit/${productItem.id}`}>
              <span className="uppercase">Edit</span>
            </Link>
          </Button>

          {productItem.status === 'available' ? (
            <Button
              className="w-full"
              size={'lg'}
              onClick={() => {
                useProductStore.getState().setProduct(productItem);
              }}
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

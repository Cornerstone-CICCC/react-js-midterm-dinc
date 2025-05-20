'use client';
import Head from 'next/head';
import Inputpair from '@/components/payment/Inputpair';
import { useEffect } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useProductStore from '@/stores/useProductStore';

const PaymentPage = () => {
  const pageTitle = 'Payment - DINCT';
  const router = useRouter();
  const { product } = useProductStore();

  useEffect(() => {
    document.title = pageTitle;
  }, [document.title]);

  const handleSubmitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/payment/complete');
  };

  return (
    <div className="p-4 pb-20 lg:p-20">
      <Head>
        <title>{document.title}</title>
      </Head>
      <div className="items-start space-y-5 lg:grid lg:grid-cols-6 lg:space-x-4">
        <div className="col-span-4 lg:px-4">
          <div className="border-t-2 border-black">
            <div className="flex flex-col justify-start items-start p-6 border-b-1 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-full flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={product?.user.fileId || '/default-profile.png'}
                      alt={product?.user.name}
                    />
                  </Avatar>
                  <p className="truncate font-semibold">{product?.user.name}</p>
                </div>
              </div>
              <div className="flex justify-start items-start gap-4">
                <div className="size-30 shrink-0 bg-gray-200 overflow-hidden relative">
                  <Image
                    src={product?.imageUrls[0] || '/tmp.png'}
                    alt={product?.name || 'Product image'}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-md truncate text-muted-foreground">
                    {product?.name}
                  </p>
                  <span className="font-bold text-lg">${product?.price}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 mb-10 lg:mt-20 pt-5 border-t-2 border-black">
            <form className="space-y-6" onSubmit={handleSubmitPayment}>
              <div>
                <h3 className="font-semibold text-md mb-4">Shipping Address</h3>
                <div className="space-y-5">
                  <Inputpair
                    label="Email"
                    sup={true}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <Inputpair
                    label="Address"
                    sup={true}
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Payment</CardTitle>
              <CardDescription>Have this item in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmitPayment}>
                <div>
                  <h3 className="font-semibold text-md mb-4">Payment Method</h3>
                  <div>
                    <div className="space-y-5">
                      <Inputpair
                        label="Card Number"
                        sup={true}
                        id="cardNumber"
                        type="number"
                        placeholder="Enter your card number"
                      />
                      <Inputpair
                        label="Expiration Date"
                        sup={true}
                        id="exprDate"
                        type="text"
                        placeholder="MM / YY"
                      />
                      <Inputpair
                        label="CVC"
                        sup={true}
                        id="cvc"
                        type="number"
                        placeholder="XXX"
                      />
                      <Inputpair
                        label="Card Holder Name"
                        sup={true}
                        id="holderName"
                        type="text"
                        placeholder="Enter card holder name"
                      />
                    </div>
                  </div>
                </div>
                <Button size={'lg'} className="w-full">
                  Pay with Card
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

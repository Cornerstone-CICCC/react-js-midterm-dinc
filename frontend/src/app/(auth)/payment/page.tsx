"use client";

import Inputpair from "@/components/payment/Inputpair";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { redirect } from "next/navigation";

const PaymentPage = () => {
  const handleSubmitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    redirect("/payment/complete");
  }
  return (
    <>
      <div className="p-20">
        <div className="items-start space-y-5 lg:grid lg:grid-cols-6 lg:space-x-4">
          <div className="col-span-4">
            <div className="border-t-2 border-black">
              <div className="flex justify-start items-center py-6 border-b-1 gap-6">
                <div className="py-4 flex gap-4">
                  <div className="size-6">
                    <Image src="/globe.svg" alt="" className="object-cover" width={40} height={40}/>
                  </div>
                  <p>Seller Name</p>
                </div>
                <div className="flex justify-start items-center gap-4">
                  <div>
                    <Image src="/globe.svg" alt="" className="object-cover" width={50} height={50}/>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg font-bold truncate">Product title</p>
                    <span>$140.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Payment</CardTitle>
                <CardDescription>Have this item in one-click.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmitPayment}>
                  <div>
                    <h3 className="font-semibold text-md mb-4">Shipping Address</h3>
                    <div className="space-y-5">
                      <Inputpair label="Email" sup={true} id="email" type="email" placeholder="Enter your email" />
                      <Inputpair label="Address" sup={true} id="address" type="text" placeholder="Enter your address" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-md mb-4">Payment Method</h3>
                    <div>
                      <div className="space-y-5">
                        <Inputpair label="Card Number" sup={true} id="cardNumber" type="number" placeholder="Enter your card number" />
                        <Inputpair label="Expiration Date" sup={true} id="exprDate" type="text" placeholder="MM / YY" />
                        <Inputpair label="CVC" sup={true} id="cvc" type="number" placeholder="XXX" />
                        <Inputpair label="Card Holder Name" sup={true} id="holderName" type="text" placeholder="Enter card holder name" />
                      </div>
                    </div>
                  </div>
                  <Button size={"lg"} className="w-full">
                    Pay with Card
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="p-20">
        <div className="items-start space-y-5 lg:grid lg:grid-cols-6 lg:space-x-4">
          <div className="col-span-4 px-4">
            <div className="border-t-2 border-black">
              <div className="flex justify-start items-center py-6 border-b-1 gap-6">
                <div className="py-4 flex gap-4">
                  <div className="size-6">
                    <Image src="/globe.svg" alt="" className="object-cover" width={40} height={40}/>
                  </div>
                  <p>Seller Name</p>
                </div>
                <div className="flex justify-start items-center gap-4">
                  <div>
                    <Image src="/globe.svg" alt="" className="object-cover" width={50} height={50}/>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg font-bold truncate">Product title</p>
                    <span>$140.00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20 pt-5 border-t-2 border-black">
              <form className="space-y-6" onSubmit={handleSubmitPayment}>
                <div>
                  <h3 className="font-semibold text-md mb-4">Shipping Address</h3>
                  <div className="space-y-5">
                    <Inputpair label="Email" sup={true} id="email" type="email" placeholder="Enter your email" />
                    <Inputpair label="Address" sup={true} id="address" type="text" placeholder="Enter your address" />
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
                        <Inputpair label="Card Number" sup={true} id="cardNumber" type="number" placeholder="Enter your card number" />
                        <Inputpair label="Expiration Date" sup={true} id="exprDate" type="text" placeholder="MM / YY" />
                        <Inputpair label="CVC" sup={true} id="cvc" type="number" placeholder="XXX" />
                        <Inputpair label="Card Holder Name" sup={true} id="holderName" type="text" placeholder="Enter card holder name" />
                      </div>
                    </div>
                  </div>
                  <Button size={"lg"} className="w-full">
                    Pay with Card
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;



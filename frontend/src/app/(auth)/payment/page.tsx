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

    <div className="grid md:grid-cols-6 items-start">
      <div className="col-span-4 px-4">
        <div className="border-t-2 border-black">
          <div className="py-4 border-b-1">
            <div className="size-6">
              <Image src="/globe.svg" alt="" className="object-cover" width={40} height={40}/>
            </div>
            <p>Seller Name</p>
          </div>
          <div className="flex justify-between items-center py-6 border-b-1">
            <div className="flex justify-start items-center gap-4">
              <div>
                <Image src="/globe.svg" alt="" className="object-cover" width={40} height={40}/>
              </div>
              <p>Product title</p>
            </div>
            <div>
              $140.00
            </div>
          </div>
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
                <h3 className="font-semibold text-md mb-4">Shipping Address</h3>
                <div className="space-y-5">
                  <Inputpair label="Email" sub={true} id="email" type="email" placeholder="Enter your email" />
                  <Inputpair label="Address" sub={true} id="address" type="text" placeholder="Enter your address" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-md mb-4">Payment Method</h3>
                <div>
                  <div className="space-y-5">
                    <Inputpair label="Card Number" sub={true} id="cardNumber" type="number" placeholder="Enter your card number" />
                    <Inputpair label="Expiration Date" sub={true} id="exprDate" type="text" placeholder="MM / YY" />
                    <Inputpair label="CVC" sub={true} id="cvc" type="number" placeholder="XXX" />
                    <Inputpair label="Card Holder Name" sub={true} id="holderName" type="text" placeholder="Enter card holder name" />
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
  );
};

export default PaymentPage;



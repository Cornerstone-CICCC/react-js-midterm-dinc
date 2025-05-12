"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

const PaymentPage = () => {
  const handleSubmitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    redirect("/payment/complete");
  }
  return (

    <div className="grid grid-cols-6 items-start">
      <div className="col-span-4">
        Product item
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
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="address" className="text-muted-foreground">Address</Label>
                    <Input id="address" type="text" placeholder="Enter your address" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-md mb-4">Payment Method</h3>
                <div>
                  <div className="space-y-5">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="cardNumber" className="text-muted-foreground">Card Number<sup className="-ml-1.5 top-0 text-[15px]">*</sup></Label>
                      <Input id="cardNumber" type="number" placeholder="Enter your card number" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="exprDate" className="text-muted-foreground">Expiration Date<sup className="-ml-1.5 top-0 text-[15px]">*</sup></Label>
                      <Input id="exprDate" type="text" placeholder="MM / YY" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="exprDate" className="text-muted-foreground">CVC<sup className="-ml-1.5 top-0 text-[15px]">*</sup></Label>
                      <Input id="cvc" type="password" placeholder="" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="holderName" className="text-muted-foreground">Card Holder Name<sup className="-ml-1.5 top-0 text-[15px]">*</sup></Label>
                      <Input id="holderName" type="text" placeholder="Enter card holder name" />
                    </div>
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



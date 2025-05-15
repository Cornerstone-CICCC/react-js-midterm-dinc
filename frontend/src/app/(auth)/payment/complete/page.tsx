import { Button } from "@/components/ui/button";
import Link from "next/link";

const PaymentCompletePage = () => {
  return (
    <div className="h-screen grid place-items-center">
      <div className="space-y-5 text-center">
        <h2 className="text-6xl font-bold">Thank you for your order!</h2>
        <p className="text-muted-foreground mb-8">Your purchase has been successfully completed.</p>
        <Button variant={"outline"} asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default PaymentCompletePage;
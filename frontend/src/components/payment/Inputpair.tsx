import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputHTMLAttributes } from "react";

const Inputpair = ({
  label,
  sub,
  ...rest
}: {sub?: boolean, label: string} & InputHTMLAttributes<HTMLInputElement>) => {
return (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor={rest.id} className="text-muted-foreground">{label}
      {sub && <sup className="-ml-1.5 top-0 text-[15px]">*</sup>}
    </Label>
    <Input {...rest} />
  </div>
)
}

export default Inputpair;

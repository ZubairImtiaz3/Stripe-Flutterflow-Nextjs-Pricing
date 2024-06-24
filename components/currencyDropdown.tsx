import * as React from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "./ui/separator";

export function CurrencyDropDown() {
  return (
    <Select defaultValue="usd">
      <SelectTrigger className="w-[150px] h-[57.6px] bg-muted text-[#EE7500] focus:ring-[#EE7500] focus:ring-offset-1">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="text-[#EE7500]">
        <SelectItem
          className="focus:text-[#EE7500] hover:text-[#EE7500]"
          value="usd"
        >
          <div className="flex items-center">
            <Image
              src="/img/usd.png"
              alt="USD"
              width={40}
              height={26}
              className="mr-2"
            />
            <Separator orientation="vertical" className="mx-2 h-6" />
            USD
          </div>
        </SelectItem>
        <SelectItem
          className="focus:text-[#EE7500] hover:text-[#EE7500]"
          value="ngn"
        >
          <div className="flex items-center">
            <Image
              src="/img/ngn.png"
              alt="USD"
              width={40}
              height={26}
              className="mr-2"
            />
            <Separator orientation="vertical" className="mx-2 h-6" />
            NGN
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

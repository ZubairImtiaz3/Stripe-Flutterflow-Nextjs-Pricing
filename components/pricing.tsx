"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type PricingSwitchProps = {
  onSwitch: (value: string) => void;
};

type PricingCardProps = {
  pricingPeriod: "monthly" | "quarterly" | "yearly";
  title: string;
  monthlyPrice?: number;
  quarterlyPrice?: number;
  yearlyPrice?: number;
  description: string;
  features: string[];
  actionLabel: string;
  popular?: boolean;
  exclusive?: boolean;
};

export const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
  <Tabs defaultValue="0" className="mx-auto pt-6" onValueChange={onSwitch}>
    <TabsList className="py-7 px-[1.125rem]">
      <TabsTrigger value="0" className="text-[#EE7500] text-base px-6 py-2">
        Monthly
      </TabsTrigger>
      <TabsTrigger value="1" className="text-[#EE7500] text-base px-6 py-2">
        Quarterly
      </TabsTrigger>
      <TabsTrigger value="2" className="text-[#EE7500] text-base px-6 py-2">
        Yearly
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

export const PricingCard = ({
  pricingPeriod,
  title,
  monthlyPrice,
  quarterlyPrice,
  yearlyPrice,
  description,
  features,
  actionLabel,
  popular,
  exclusive,
}: PricingCardProps) => {
  const getPrice = () => {
    switch (pricingPeriod) {
      case "yearly":
        return yearlyPrice ? `USD ${yearlyPrice}` : "Custom";
      case "quarterly":
        return quarterlyPrice ? `USD ${quarterlyPrice}` : "Custom";
      case "monthly":
      default:
        return monthlyPrice ? `USD ${monthlyPrice}` : "Custom";
    }
  };

  const getPeriod = () => {
    switch (pricingPeriod) {
      case "yearly":
        return "/year";
      case "quarterly":
        return "/quarter";
      case "monthly":
      default:
        return "/month";
    }
  };

  return (
    <Card
      className={cn(
        `w-72 flex flex-col justify-between py-1 ${
          popular ? "border-rose-400" : "border-zinc-700"
        } mx-auto sm:mx-0`,
        {
          "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
            exclusive,
        }
      )}
    >
      <div>
        <CardHeader className="pb-8 pt-4">
          <div className="flex justify-between">
            <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">
              {title}
            </CardTitle>
            {pricingPeriod === "yearly" && yearlyPrice && monthlyPrice && (
              <div
                className={cn(
                  "px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white",
                  {
                    "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black ":
                      popular,
                  }
                )}
              >
                Save ${monthlyPrice * 12 - yearlyPrice}
              </div>
            )}
          </div>
          <CardDescription className="pt-1.5 h-12">
            {description}
          </CardDescription>
          <div className="flex gap-0.5">
            <h3 className="text-3xl font-bold">{getPrice()}</h3>
            <span className="flex flex-col justify-end text-sm mb-1">
              {getPeriod()}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button className="relative inline-flex w-full items-center justify-center rounded-md bg-black text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
            {actionLabel}
          </Button>
          <CardDescription className="pt-1.5 h-12">
            Try free for 3 days
          </CardDescription>
          <Separator />
          {features.map((feature: string) => (
            <CheckItem key={feature} text={feature} />
          ))}
        </CardContent>
      </div>
      <CardFooter className="mt-2"></CardFooter>
    </Card>
  );
};


const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
  </div>
);

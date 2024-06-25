"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type PricingSwitchProps = {
  onSwitch: (value: string) => void;
};

type Feature = {
  text: string;
  includedMonthly: boolean;
  includedQuarterly: boolean;
  includedYearly: boolean;
};

type PricingCardProps = {
  pricingPeriod: "monthly" | "quarterly" | "yearly";
  title: string;
  monthlyPrice?: number;
  quarterlyPrice?: number;
  yearlyPrice?: number;
  yearlyPriceNgn?: number;
  quarterlyPriceNgn?: number;
  monthlyPriceNgn?: number;
  monthlySavePercent?: number;
  quarterlySavePercent?: number;
  yearlySavePercent?: number;
  description: string;
  features: Feature[];
  actionLabel: string;
  popular?: boolean;
  selectedCurrency: string;
};

export const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
  <Tabs defaultValue="0" className="mx-auto pt-6" onValueChange={onSwitch}>
    <TabsList className="py-7 px-[1.125rem]">
      <TabsTrigger
        value="0"
        className="text-[#EE7500] text-sm sm:text-base px-6 py-2"
      >
        Monthly
      </TabsTrigger>
      <TabsTrigger
        value="1"
        className="text-[#EE7500] text-sm sm:text-base px-6 py-2"
      >
        Quarterly
      </TabsTrigger>
      <TabsTrigger
        value="2"
        className="text-[#EE7500] text-sm sm:text-base px-6 py-2"
      >
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
  yearlyPriceNgn,
  quarterlyPriceNgn,
  monthlyPriceNgn,
  monthlySavePercent,
  quarterlySavePercent,
  yearlySavePercent,
  description,
  features,
  actionLabel,
  popular,
  selectedCurrency,
}: PricingCardProps) => {
  const getPrice = () => {
    let price;
    switch (pricingPeriod) {
      case "yearly":
        price = selectedCurrency === "ngn" ? yearlyPriceNgn : yearlyPrice || 0;
        break;
      case "quarterly":
        price =
          selectedCurrency === "ngn" ? quarterlyPriceNgn : quarterlyPrice || 0;
        break;
      case "monthly":
      default:
        price =
          selectedCurrency === "ngn" ? monthlyPriceNgn : monthlyPrice || 0;
        break;
    }

    return {
      currency: selectedCurrency.toUpperCase(),
      amount: price
        ?.toLocaleString("en-US", { maximumFractionDigits: 0 })
        .replace(/,/g, ", "),
      amountForDiscount: price,
    };
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

  const getSavePercent = () => {
    switch (pricingPeriod) {
      case "yearly":
        return yearlySavePercent;
      case "quarterly":
        return quarterlySavePercent;
      case "monthly":
      default:
        return monthlySavePercent;
    }
  };

  const calculateOriginalPrice = () => {
    const savePercent = getSavePercent() ?? 0;
    const price = getPrice().amountForDiscount;

    if (savePercent === 0)
      return Math.round(price as number)
        .toLocaleString("en-US", {
          maximumFractionDigits: 0,
        })
        .replace(/,/g, ", ");

    const discount = (price as number) * (savePercent / 100);
    const discountedPrice = (price as number) - discount;

    if (discountedPrice === 25.65 || discountedPrice === 31.35) {
      return discountedPrice;
    }

    return Math.round(discountedPrice)
      ?.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      })
      .replace(/,/g, ", ");
  };

  const getFeatureInclusion = (feature: Feature) => {
    switch (pricingPeriod) {
      case "yearly":
        return feature.includedYearly;
      case "quarterly":
        return feature.includedQuarterly;
      case "monthly":
      default:
        return feature.includedMonthly;
    }
  };

  return (
    <>
      <Card
        className={cn(
          `relative max-w-[23.125rem] flex flex-col justify-between py-1 ${
            popular
              ? "border-[#EE7500] border-2 rounded-b-lg mt-10 lg:mt-0"
              : "border-[rgba(0, 31, 115, 0.1)] rounded-lg"
          } mx-auto sm:mx-0`
        )}
      >
        <div>
          {popular && (
            <div className="absolute font-semibold text-sm text-white [background:var(--gradient)] text-center py-3 rounded-t-lg sm:w-[23.15rem] w-[101%] top-[-2.5rem] right-[-2px]">
              Most Popular
            </div>
          )}

          <CardHeader className="space-y-6 pb-7 pt-4 px-8">
            <div>
              <CardTitle className="text-[#000] text-xl font-semibold">
                {title}
              </CardTitle>
              <CardDescription className="pt-2.5 text-sm text-primary-light">
                {description}
              </CardDescription>
            </div>

            {(pricingPeriod === "yearly" || pricingPeriod === "quarterly") &&
              yearlyPrice &&
              quarterlyPrice && (
                <div className="flex items-center space-x-2">
                  {getSavePercent() && (
                    <span className="text-sm text-primary-light line-through">
                      {getPrice().currency}
                      {getPrice().amount}
                    </span>
                  )}
                  <div
                    className={cn(
                      "w-max px-2.5 rounded-[0.938rem] h-fit text-sm py-1 font-semibold text-[#FF6600] [background:var(--gradient-light)]",
                      {
                        popular,
                      }
                    )}
                  >
                    Save {getSavePercent()}%
                  </div>
                </div>
              )}

            <div className="flex items-center">
              <span className="text-base text-primary-light">
                {getPrice().currency}
              </span>
              <span className="font-semibold text-[2.125rem] text-[#FF6600] relative bottom-2 ml-1">
                {calculateOriginalPrice()}
              </span>
              <span className="flex flex-col justify-end text-base text-primary-light mb-1">
                {getPeriod()}
              </span>
            </div>

            <Button
              variant="outline"
              className={`text-[#FF6600] hover:bg-secondary hover:text-white px-6 font-medium border-secondary border-2 ${
                popular ? "bg-secondary text-white" : ""
              }`}
            >
              {actionLabel}
            </Button>
            <CardDescription className="text-sm text-primary-light pb-2">
              Try free for 3 days
            </CardDescription>
            <Separator className="bg-gray-300 mt-2" />
          </CardHeader>

          <CardContent className="flex flex-col gap-2 px-8 space-y-3">
            <p className="font-medium text-base">Top Features</p>
            {features.map((feature, index) => (
              <CheckItem
                key={index}
                text={feature.text}
                included={getFeatureInclusion(feature)}
              />
            ))}
          </CardContent>
        </div>
      </Card>
    </>
  );
};

const CheckItem = ({ text, included }: { text: string; included: boolean }) => (
  <div className="flex gap-2">
    {included ? (
      <CheckCircle2 size={20} className="my-auto text-[#00DF76]" />
    ) : (
      <CircleX size={20} className="my-auto text-[#d62828bf]" />
    )}
    <p className="pt-0.5 font-medium text-primary-light text-sm">{text}</p>
  </div>
);

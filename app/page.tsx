"use client";
import { useState } from "react";
import { PricingCard, PricingSwitch } from "@/components/pricing";

export default function Home() {
  const [pricingPeriod, setPricingPeriod] = useState<
    "monthly" | "quarterly" | "yearly"
  >("monthly");

  const togglePricingPeriod = (value: string) => {
    switch (value) {
      case "0":
        setPricingPeriod("monthly");
        break;
      case "1":
        setPricingPeriod("quarterly");
        break;
      case "2":
        setPricingPeriod("yearly");
        break;
      default:
        setPricingPeriod("monthly");
    }
  };

  const plans = [
    {
      title: "G-Basic",
      monthlyPrice: 6,
      quarterlyPrice: 18,
      yearlyPrice: 72,
      monthlySavePercent: 0,
      quarterlySavePercent: 5,
      yearlySavePercent: 15,
      description: "Upgrade today for amazing exclusive offers.",
      features: [
        "Example Feature Number 1",
        "Example Feature Number 2",
        "Example Feature Number 3",
      ],
      actionLabel: "Choose Plan",
    },
    {
      title: "G-Premium",
      monthlyPrice: 9,
      quarterlyPrice: 27,
      yearlyPrice: 108,
      monthlySavePercent: 0,
      quarterlySavePercent: 5,
      yearlySavePercent: 15,
      description: "Upgrade today for amazing exclusive offers.",
      features: [
        "Example Feature Number 1",
        "Example Feature Number 2",
        "Example Feature Number 3",
      ],
      actionLabel: "Choose Plan",
      popular: true,
    },
    {
      title: "G-Advance",
      monthlyPrice: 11,
      quarterlyPrice: 33,
      yearlyPrice: 132,
      monthlySavePercent: 0,
      quarterlySavePercent: 5,
      yearlySavePercent: 15,
      description: "Upgrade today for amazing exclusive offers.",
      features: [
        "Example Feature Number 1",
        "Example Feature Number 2",
        "Example Feature Number 3",
        "Super Exclusive Feature",
      ],
      actionLabel: "Choose Plan",
    },
  ];

  return (
    <>
      <div className="bg-pricing-hero w-full h-[22.313rem] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center max-w-[31.5rem] text-center space-y-3">
          <p className="text-lg font-medium text-primary">Affordable pricing</p>
          <h3 className="text-[2rem] font-medium text-primary">
            Choose the best GMIND AI plan
          </h3>
          <p className="text-sm text-primary-light">
            We offer three comprehensive packages to cater to your needs:
            <br /> Basic, Premium, and Supported/Partners.
          </p>
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </div>
      </div>

      <div className="py-8">
        <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
          {plans.map((plan) => {
            return (
              <PricingCard
                key={plan.title}
                {...plan}
                pricingPeriod={pricingPeriod}
              />
            );
          })}
        </section>
      </div>
    </>
  );
}

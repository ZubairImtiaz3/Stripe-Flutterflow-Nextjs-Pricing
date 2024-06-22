"use client";

import { PricingCard, PricingSwitch } from "@/components/pricing";
import React, { useState } from "react";

export default function Home() {
  const [isYearly, setIsYearly] = useState(false);
  const togglePricingPeriod = (value: string) =>
    setIsYearly(parseInt(value) === 1);

  const plans = [
    {
      title: "Basic",
      monthlyPrice: 10,
      yearlyPrice: 100,
      description: "Essential features you need to get started",
      features: [
        "Example Feature Number 1",
        "Example Feature Number 2",
        "Example Feature Number 3",
      ],
      actionLabel: "Get Started",
    },
    {
      title: "Pro",
      monthlyPrice: 25,
      yearlyPrice: 250,
      description: "Perfect for owners of small & medium businessess",
      features: [
        "Example Feature Number 1",
        "Example Feature Number 2",
        "Example Feature Number 3",
      ],
      actionLabel: "Get Started",
      popular: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Dedicated support and infrastructure to fit your needs",
      features: [
        "Example Feature Number 1",
        "Example Feature Number 2",
        "Example Feature Number 3",
        "Super Exclusive Feature",
      ],
      actionLabel: "Contact Sales",
      exclusive: true,
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
              <PricingCard key={plan.title} {...plan} isYearly={isYearly} />
            );
          })}
        </section>
      </div>
    </>
  );
}

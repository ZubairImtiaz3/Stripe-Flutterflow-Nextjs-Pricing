

<div align="center">
<h1>Stripe Flutterflow Nextjs Pricing Component</h1>

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Stripe](https://img.shields.io/badge/stripe-%2338B2AC.svg?style=for-the-badge&logo=stripe&logoColor=white)
![FLutterFlow](https://img.shields.io/badge/flutterflow-%234CAF50.svg?style=for-the-badge&logo=flutterflow&logoColor=white)
</div>

## Features

- **Dynamic Pricing Cards**: Includes three pricing tiers—Basic, Popular, and Advance.
- **Customizable Tabs**: Switch between monthly, weekly, and yearly pricing options.
- **Currency Dropdown**: Toggle between USD and NGN currencies.
- **Stripe Integration**: Handles payments in USD.
- **FlutterFlow Integration**: Manages payments in NGN.
- **Shadcn Components**: Utilizes Shadcn for a seamless and stylish UI.
- **Fully Customizable**: Easily adjust pricing plans, currency options, and design elements.

## Technologies

- **Next.js**: A React framework for server-rendered and statically generated web applications.
- **TypeScript**: For adding static type definitions.
- **Shadcn UI**: A collection of components for building UI.
- **Stripe**: Handles payments and transactions in USD.
- **Flutterwave-react-v3**: Manages payments and currency conversion in NGN.

## Installation

### Clone & Run Locally:
- Clone this repository.
- Install Dependencies: <kbd>npm install</kbd>
- Run <kbd>npm run dev</kbd> to start
- You can access the the application at <kbd>http://localhost:3000</kbd>
   
### Import In Your Project:
- Make sure you have initialized Shadcn UI in your project

- Use your package manager to install the required dependencies:
```bash
npm install @stripe/stripe-js stripe flutterwave-react-v3
```


- Copy the following components into your project:
```bash
app/components/pricing.tsx
app/components/PaymentComponent.tsx
app/components/CurrencyDropdown.tsx
```


- Copy the page into your project:
```bash
app/page.tsx
```

- Copy Route Handler in your project:
```bash
app/api/create-checkout-session
```

- Define your pricing data in a data.ts file. Here's an example of the data format:

| Property            | Type         | Example Value                                  |
|---------------------|--------------|-----------------------------------------------|
| title             | string     | "G-Basic"                                    |
| monthlyPrice      | number     | 60                                           |
| quarterlyPrice    | number     | 18                                           |
| yearlyPrice       | number     | 72                                           |
| yearlyPriceNgn    | number     | 65294                                        |
| quarterlyPriceNgn | number     | 15000                                        |
| monthlyPriceNgn   | number     | 5000                                         |
| monthlySavePercent| number     | 0                                            |
| quarterlySavePercent| number   | 5                                            |
| yearlySavePercent | number     | 15                                           |
| description       | string     | "Upgrade today for amazing exclusive offers."|
| features          | array      |  [{ text: "Infinite Chatting", includedMonthly: true, includedQuarterly: true, includedYearly: true }]                                                                         |
| actionLabel       | string     | "Choose Plan"                                |
| popular           | boolean    | true                                         |


## How It Can Be Improved

- **Real-time Currency Updates**: Implement dynamic pricing changes based on real-time currency exchange rates by integrating a real-time currency API. This will ensure that pricing remains accurate and up-to-date across different currencies.


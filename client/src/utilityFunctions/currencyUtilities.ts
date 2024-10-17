import { exchangeRates } from "../constants/currency";

export const formatAmount = (amount: number): string => {
  const amountStr = amount.toString();
  const afterPoint = amountStr.includes('.') ? amountStr.split('.')[1] : ''; 
  const beforePoint = amountStr.split('.')[0];

  const lastThree = beforePoint.slice(-3);
  const otherNumbers = beforePoint.slice(0, beforePoint.length - 3);
  
  const formattedBeforePoint = otherNumbers !== ''
    ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
    : lastThree;

  return afterPoint ? formattedBeforePoint + '.' + afterPoint : formattedBeforePoint;
};

export const convertCurrency = (amountInINR: number, targetCurrency: string): string => {
  const rate = exchangeRates[targetCurrency.toUpperCase()];
  
  if (!rate) {
    return `Conversion to ${targetCurrency} is not supported.`;
  }

  const convertedAmount = amountInINR * rate;
  return `${convertedAmount.toFixed(2)} ${targetCurrency.toUpperCase()}`;
};
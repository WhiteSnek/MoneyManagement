import { exchangeRates } from "../constants/currency";

export const formatAmount = (amount: number): string => {
  const isNegative = amount < 0;
  
  const absoluteAmount = Math.abs(amount);
  const amountStr = absoluteAmount.toFixed(2); 
  const [beforePoint, afterPoint] = amountStr.split('.');

  const formattedBeforePoint = beforePoint.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${isNegative ? '-' : ''}${formattedBeforePoint}.${afterPoint}`;
};

export const convertCurrency = (amountInINR: number, targetCurrency: string): number => {
  const rate = exchangeRates[targetCurrency.toUpperCase()];
  
  if (!rate) {
    return NaN;
  }

  const convertedAmount = amountInINR * rate;
  return Math.round((convertedAmount + Number.EPSILON) * 100) / 100

};

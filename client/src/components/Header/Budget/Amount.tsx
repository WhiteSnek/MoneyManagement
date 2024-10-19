import React from 'react'
import { convertCurrency, formatAmount } from '../../../utilityFunctions/currencyUtilities'
import { useCurrency } from '../../../providers/CurrencyProvider'

interface AmountProps {
    amount: number
}

const Amount:React.FC<AmountProps> = ({amount}) => {
  const {currency} = useCurrency()
  return (
    <div className='font-semibold'>
      {formatAmount(convertCurrency(amount, currency.code))}
    </div>
  )
}

export default Amount

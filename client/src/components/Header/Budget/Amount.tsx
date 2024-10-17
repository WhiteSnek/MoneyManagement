import React from 'react'
import { formatAmount } from '../../../utilityFunctions/currencyUtilities'

interface AmountProps {
    amount: number
}

const Amount:React.FC<AmountProps> = ({amount}) => {
  return (
    <div>
      {formatAmount(amount)}
    </div>
  )
}

export default Amount

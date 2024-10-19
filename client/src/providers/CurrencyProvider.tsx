import React, { createContext, ReactNode, useContext, useState } from 'react'

interface Currency {
    code: string
    symbol: string
}

interface CurrencyContextType {
    currency: Currency;
    setCurrency: React.Dispatch<React.SetStateAction<Currency>>
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export const useCurrency = (): CurrencyContextType => {
    const context = useContext(CurrencyContext)
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}

interface CurrencyProviderProps {
    children: ReactNode
  }



const CurrencyProvider:React.FC<CurrencyProviderProps> = ({children}) => {
    const [currency, setCurrency] = useState<Currency>({ code: 'INR', symbol: '₹' })
  return (
    <CurrencyContext.Provider value={{currency, setCurrency}}>
      {children}
    </CurrencyContext.Provider>
  )
}

export default CurrencyProvider

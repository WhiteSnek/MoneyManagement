import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { monthlyList } from "../constants/user";
interface Category {
  name: string;
  price: number;
  count: number;
}

interface Month {
  name: string;
  price: number;
  count: number;
}

interface Graph {
  category: Category[];
  month: Month[];
}

interface GraphContextType {
  Graph: Graph;
  setGraph: React.Dispatch<React.SetStateAction<Graph>>;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const useGraph = (): GraphContextType => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error("useGraph must be used within a GraphProvider");
  }
  return context;
};

interface GraphProviderProps {
  children: ReactNode;
}


const GraphProvider: React.FC<GraphProviderProps> = ({ children }) => {
  const [Graph, setGraph] = useState<Graph>({
    category: [],
    month: [],
  });

  useEffect(() => {
    const categoryMap: Record<string, { price: number; count: number }> = {};
    const monthMap: Record<string, { price: number; count: number }> = {};

    monthlyList.forEach(({ month, products }) => {

      const monthTotals = { price: 0, count: 0 };

      products.forEach(({ price, quantity, category }) => {
        if (!categoryMap[category]) {
          categoryMap[category] = { price: 0, count: 0 };
        }
        categoryMap[category].price += price; 
        categoryMap[category].count += quantity; 

        monthTotals.price += price * quantity; 
        monthTotals.count += quantity; 
      });

      monthMap[month] = monthTotals; 
    });


    const categoriesArray = Object.entries(categoryMap).map(([name, { price, count }]) => ({
      name,
      price,
      count,
    }));

    const monthsArray = Object.entries(monthMap).map(([name, { price, count }]) => ({
      name,
      price,
      count,
    }));

    setGraph({
      category: categoriesArray,
      month: monthsArray,
    });
  }, []); 

  return (
    <GraphContext.Provider value={{ Graph, setGraph }}>
      {children}
    </GraphContext.Provider>
  );
};

export default GraphProvider;

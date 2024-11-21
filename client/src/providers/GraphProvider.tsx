import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useList } from "./ListProvider";

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
  const { lists, getLists } = useList();

  useEffect(() => {
    getLists();
  }, []);

  useEffect(() => {
    if (!lists) return; 

    const categoryMap: Record<string, { price: number; count: number }> = {};
    const monthMap: Record<string, { price: number; count: number }> = {};
    
    lists.forEach(({ title, items }) => {
      const monthTotals = { price: 0, count: 0 };
      const boughtItems = items.filter(item => item.bought)
      boughtItems.forEach(({ price, quantity, category }) => {
        category = category[0].toUpperCase()+category.slice(1)
        if (!categoryMap[category]) {
          categoryMap[category] = { price: 0, count: 0 };
        }
        categoryMap[category].price += price;
        categoryMap[category].count += quantity;

        monthTotals.price += price * quantity;
        monthTotals.count += quantity;
      });

      monthMap[title[0].toUpperCase()+title.slice(1)] = monthTotals;
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
  }, [lists]);

  return (
    <GraphContext.Provider value={{ Graph, setGraph }}>
      {children}
    </GraphContext.Provider>
  );
};

export default GraphProvider;

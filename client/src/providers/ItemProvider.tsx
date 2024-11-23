import React, { createContext, ReactNode, useContext, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { AddItem, ItemType } from "../types/ListType";
import { BoughtItemResponse, ItemResponse } from "../types/ApiResponses";
import { BoughtItemsType } from "../types/ListType";

interface ItemContextType {
  items: ItemType[] | undefined;
  setItems: React.Dispatch<React.SetStateAction<ItemType[] | undefined>>;
  addItem: (details: AddItem) => Promise<string | null>;
  buyItem: (productId: string) => Promise<string | null>;
  getBoughtItems: () => Promise<BoughtItemsType[] | null>
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const useItem = (): ItemContextType => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItem must be used within a ItemProvider");
  }
  return context;
};

interface ItemProviderProps {
  children: ReactNode;
}

const ItemProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [items, setItems] = useState<ItemType[] | undefined>(undefined);
  const addItem = async (details: AddItem) => {
    const formData = new FormData();
    const {
      name,
      specifications,
      displayImage,
      category,
      price,
      quantity,
      link,
      isService,
      listId,
    } = details;
    if(displayImage) formData.append("displayImage", displayImage as File); 
    formData.append("name", name);
    formData.append("specifications", specifications);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("link", link);
    formData.append("isService", isService);
    formData.append("listId", listId)
    try {
        const response: AxiosResponse<ItemResponse> = await axios.post("/item/add", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data)
        return response.data.status
    } catch (error) {
        console.log(error)
        return null
    }
  };
  const buyItem = async(productId: string):Promise<string | null> => {
    try {
      const response:AxiosResponse<ItemResponse> = await axios.patch(`/item/${productId}`,{}, {withCredentials: true})
      return response.data.status
    } catch (error) {
      return null;
    }
    
  }

  const getBoughtItems = async():Promise<BoughtItemsType[] | null> => {
    try {
      const response: AxiosResponse<BoughtItemResponse> = await axios.get('/item/bought',{withCredentials: true});
      return response.data.data
    } catch (error) {
      return null
    }
  }
  return (
    <ItemContext.Provider value={{ items, setItems, addItem,buyItem, getBoughtItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;

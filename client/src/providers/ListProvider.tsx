import React, { createContext, ReactNode, useContext, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ListType } from "../types/ListType";
import { AddListResponse, ListResponse } from "../types/ApiResponses";

interface ListContextType {
  lists: ListType[];
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
  getLists: () => Promise<void>;
  addList: (title: string) => Promise<void>;
  deleteList: (listId: string) => Promise<string | null>
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export const useList = (): ListContextType => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList must be used within a ListProvider");
  }
  return context;
};

interface ListProviderProps {
  children: ReactNode;
}

const ListProvider: React.FC<ListProviderProps> = ({ children }) => {
  const [lists, setLists] = useState<ListType[]>([]);
  const getLists = async () => {
    try {
      const response: AxiosResponse<ListResponse> = await axios.get(
        "/list/lists",
        { withCredentials: true }
      );
      if (response.data.status === "success") setLists(response.data.data);
      else console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const addList = async (title: string) => {
    if (!title.trim()) {
      console.log("Title cannot be empty.");
      return;
    }

    try {
      // Make API call
      const response: AxiosResponse<AddListResponse> = await axios.post(
        "/list/add",
        { title },
        { withCredentials: true }
      );

      // Handle success
      if (response.data.status === "success") {
        setLists(response.data.data);
      } else {
        console.log(`Error: ${response.data.message}`);
      }
    } catch (error) {
      // Improved error logging
      if (axios.isAxiosError(error)) {
        console.log(
          `Axios error: ${error.response?.data?.message || error.message}`
        );
      } else {
        console.log(`Unexpected error: ${error}`);
      }
    }
  };

  const deleteList = async (listId: string): Promise<string | null> => {
    try {
      const response:AxiosResponse<string> = await axios.delete(`/list/${listId}`,{withCredentials: true})
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  return (
    <ListContext.Provider value={{ lists, setLists, getLists, addList, deleteList }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListProvider;

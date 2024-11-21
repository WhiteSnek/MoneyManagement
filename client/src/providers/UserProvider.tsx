import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { User } from '../types/UserTypes'
import axios, { AxiosResponse } from 'axios';

interface UserContextType {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
    getUserProfile: () => void
    addBonus: (bonus: number) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = (): UserContextType => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

interface UserProviderProps {
    children: ReactNode
  }



const UserProvider:React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | undefined>(undefined)
    const getUserProfile = async () => {
        try {
          const response: AxiosResponse<User> = await axios.get('/user/profile', { withCredentials: true });
          setUser(response.data);
        } catch (error) {
          console.log("Error fetching profile:", error);
        }
    };
    const addBonus = async (bonus: number): Promise<void> => {
      try {
        const response: AxiosResponse<{message: string, bonus: User}> = await axios.patch('/user/add-bonus',{bonus}, {withCredentials: true})
        setUser(response.data.bonus)
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    }
    useEffect(() => {
      getUserProfile();
    }, []);

  return (
    <UserContext.Provider value={{user, setUser, getUserProfile, addBonus}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

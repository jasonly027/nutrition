import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { Food } from "./types/Food";

interface Items {
  today: Date;
  setToday: Dispatch<SetStateAction<Date>>;

//   foods: Food[];
//   setFoods: Dispatch<SetStateAction<Food[]>>;
}

const ItemsContext = createContext<Items | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [today, setToday] = useState<Date>(new Date());

  const items: Map<String, [Food[], React.Dispatch<React.SetStateAction<Food[]>>]> = new Map();

  return <ItemsContext.Provider value={{ today, setToday }}>{children}</ItemsContext.Provider>;
}

export const useItemsProvider = () => {
    const context = useContext(ItemsContext);
    if(!context) throw new Error("Context called while not in a provider")
    return context;
}

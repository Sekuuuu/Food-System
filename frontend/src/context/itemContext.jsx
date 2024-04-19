import React, { createContext, useContext, useEffect, useState } from "react";

const ItemsContext = createContext();

export const useItems = () => {
  return useContext(ItemsContext);
};

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/item");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchItems();
  }, []);
  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

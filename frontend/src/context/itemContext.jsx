import React, { createContext, useContext, useEffect, useState } from "react";

const ItemsContext = createContext();

export const useItems = () => {
  return useContext(ItemsContext);
};

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/item")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items: ", error));
  }, []);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

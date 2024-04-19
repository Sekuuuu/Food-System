import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const useMenu = () => {
  return useContext(MenuContext);
};

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);

  return (
    <MenuContext.Provider value={{ menus, setMenus }}>
      {children}
    </MenuContext.Provider>
  );
};

import React, { useState, useContext, useEffect } from "react";

const CategoryContext = React.createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/category");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useMenu } from "../../context/menuContext";
import { useItems } from "../../context/itemContext";
import { useCategory } from "../../context/categoryProvider";

const MenuTable = () => {
  const { menus, setMenus } = useMenu();
  const { items } = useItems();
  const { categories } = useCategory();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/menu");
        const data = await response.json();
        setMenus(data);
      } catch (error) {
        console.error("Error fetching menus: ", error);
      }
    };

    fetchMenus();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find((category) => category._id === categoryId);
    return category ? category.name : "Unknown";
  };

  const getItemName = (itemId) => {
    const item = items.find((item) => item._id === itemId);
    return item ? item.name : "Unknown";
  };

  const getItemImage = (itemId) => {
    const item = items.find((item) => item._id === itemId);
    return item ? item.image : " ";
  };

  const handleDeleteMenu = async (menuId) => {
    try {
      await fetch(`http://localhost:4000/api/menu/${menuId}`, {
        method: "DELETE",
      });
      setMenus((prevMenus) => prevMenus.filter((menu) => menu._id !== menuId));
      toast.success("Menu deleted successfully.", {
        position: "bottom-left",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting menu: ", error);
      toast.error("Failed to delete menu. Please try again.", {
        position: "bottom-left",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Today's Menu</h1>
      <table className="w-full border-collapse border mt-4">
        <thead>
          <tr>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Item</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Start Time</th>
            <th className="p-2 border">End Time</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu._id}>
              <td className="p-2 border">{getCategoryName(menu.category_id)}</td>
              <td className="p-2 border">{getItemName(menu.item_id)}</td>
              <td className="px-6 py-4 border">
                        <div className="text-sm text-gray-900">
                          <img
                            src={`http://localhost:4000/images/user/${getItemImage(menu.item_id)}`}
                            alt={getItemName(menu.item_id)}
                            className="cursor-pointer h-10"
                          />
                        </div>
                      </td>
              <td className="p-2 border">{menu.start_time}</td>
              <td className="p-2 border">{menu.end_time}</td>
              <td className="p-2 border">{menu.quantity}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDeleteMenu(menu._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuTable;

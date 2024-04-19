import React, { useState } from "react";
import NavBar from "../components/navbar";
import ItemManagement from "../components/Item_manager/itemManagement";
import MenuTable from "../components/menu_manager/menuTable";
import UserManagement from "../components/user_manager/user_manager";
import OrderManagement from "../components/order_manager/order_manager";
import { ItemsProvider } from "../context/itemContext";
import { CategoryProvider } from "../context/categoryProvider";
import { OrderProvider } from "../context/orderContext";
import { UserProvider } from "../context/userContext";
import { ToastContainer } from "react-toastify";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("itemManagement");

  return (
    <div>
      <NavBar />
      <UserProvider>
        <OrderProvider>
          <ItemsProvider>
            <CategoryProvider>
              <div className="container mx-auto p-8">
                <div className="flex justify-center">
                  <button
                    onClick={() => setActiveTab("itemManagement")}
                    className={`px-4 py-2 mx-2 rounded ${
                      activeTab === "itemManagement"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    Item Management
                  </button>
                  <button
                    onClick={() => setActiveTab("menuTable")}
                    className={`px-4 py-2 mx-2 rounded ${
                      activeTab === "menuTable"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    Menu Table
                  </button>
                  <button
                    onClick={() => setActiveTab("userManagement")}
                    className={`px-4 py-2 mx-2 rounded ${
                      activeTab === "userManagement"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    User Management
                  </button>
                  <button
                    onClick={() => setActiveTab("orderManagement")}
                    className={`px-4 py-2 mx-2 rounded ${
                      activeTab === "orderManagement"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    Order Management
                  </button>
                </div>
                {activeTab === "itemManagement" && <ItemManagement />}
                {activeTab === "menuTable" && <MenuTable />}
                {activeTab === "userManagement" && <UserManagement />}
                {activeTab === "orderManagement" && <OrderManagement />}
              </div>
            </CategoryProvider>
          </ItemsProvider>
        </OrderProvider>
      </UserProvider>
      <ToastContainer/>
    </div>
  );
};

export default Admin;

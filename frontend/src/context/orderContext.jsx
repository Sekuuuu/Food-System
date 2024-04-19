import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const useOrder = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/order");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await fetch(`http://localhost:4000/api/order/${orderId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error cancelling order: ", error);
    }
  };

  const setOrder = async (orderId) => {
    try {
      await fetch(`http://localhost:4000/api/order/${orderId}/set-delivered`, {
        method: "PUT",
      });
    } catch (error) {
      console.error("Error setting order as delivered: ", error);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, getAllOrders, cancelOrder, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

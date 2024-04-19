import React, { useEffect } from "react";
import { useOrder } from "../../context/orderContext";
import { useUser } from "../../context/userContext";
import { useMenu } from "../../context/menuContext";

const OrderManagement = () => {
  const { orders, getAllOrders, cancelOrder, setOrder } = useOrder();
  const { users } = useUser();
  const { menus } = useMenu();

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    await cancelOrder(orderId);
    getAllOrders();
  };

  const handleSetOrderDelivered = async (orderId) => {
    await setOrder(orderId);
    getAllOrders();
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.username : "Unknown";
  };

  const getItemName = (menuId) => {
    const menu = menus.find((menu) => menu._id === menuId);
    return menu ? menu.item_id : "Unknown";
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">Order Management</h1>
      <table className="w-full border-collapse border mt-4">
        <thead>
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">User Name</th>
            <th className="p-2 border">Item Name</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Time Since Ordered</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="p-2 border">{order._id}</td>
              <td className="p-2 border">{getUserName(order.user_id)}</td>
              <td className="p-2 border">{getItemName(order.menu_id)}</td>
              <td className="p-2 border">{order.quantity}</td>
              <td className="p-2 border">
                {`${((new Date() - new Date(order.date)) / (1000 * 60)).toFixed(0)} minutes ago`}
              </td>
              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border">
                {order.status !== "Delivered" && (
                  <button
                    onClick={() => handleSetOrderDelivered(order._id)}
                    className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Set Delivered
                  </button>
                )}
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;

import React from "react";
import { ToastContainer } from "react-toastify";
import ItemForm from "./itemForm";
import ItemTable from "./itemTable";
import { ItemsProvider } from "../../context/itemContext";

const ItemManagement = () => {
  return (
    <ItemsProvider>
      <div className="container mx-auto px-4 py-8">
        <ItemForm />
        <ItemTable />
        <ToastContainer />
      </div>
    </ItemsProvider>
  );
};

export default ItemManagement;

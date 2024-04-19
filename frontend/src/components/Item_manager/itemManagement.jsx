import React from "react";
import ItemForm from "./itemForm";
import ItemTable from "./itemTable";

const ItemManagement = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ItemForm />
      <ItemTable />
    </div>
  );
};

export default ItemManagement;

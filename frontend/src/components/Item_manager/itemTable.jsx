import React, { useState } from "react";
import { useItems } from "../../context/itemContext";
import { ToastContainer, toast } from "react-toastify";


const ItemTable = () => {
  const { items, setItems } = useItems();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteItem = (itemId) => {
    // Send DELETE request to API to delete item
    fetch(`http://localhost:4000/api/item/${itemId}`, {
      method: "DELETE",
    })
      .then(() => {
        // Filter out the deleted item from the items state
        setItems(items.filter((item) => item._id !== itemId));
      })
      .catch((error) => console.error("Error deleting item: ", error));
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-5">
      <h1 className="text-3xl font-semibold mb-4">All Items</h1>
      <div className="relative flex-grow w-full">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-8 px-4 rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:ring focus:border-gray-400 text-center"
        />
        <button
          id="searchButton"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
      <table className="w-full border-collapse border mt-4">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item._id}>
              <td className="p-2 border text-center">{item.name}</td>
              <td className="p-2 border text-center">Rs. {item.price}</td>
              <td className="p-2 border flex justify-center">
                {item.image && (
                  <img
                    src={`http://localhost:4000/images/user/${item.image}`}
                    alt={item.name}
                    className="h-14 rounded-full max-w-14"
                  />
                )}
              </td>
              <td className="p-2 border">
                <div className=" flex justify-center">
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded mr-2"
                >
                  Delete
                </button>
                <button className="bg-green-500 text-white py-1 px-2 rounded">
                  Add to today's menu
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />

    </div>
  );
};

export default ItemTable;

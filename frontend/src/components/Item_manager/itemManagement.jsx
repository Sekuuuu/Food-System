import React, { useState, useEffect } from "react";

const ItemManagement = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemImage, setNewItemImage] = useState(null);

  useEffect(() => {
    // Fetch items from API
    fetch("http://localhost:4000/api/item")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items: ", error));
  }, []);

  const handleAddItem = () => {
    // Perform validation
    if (!newItemName || !newItemPrice) {
      alert("Please enter item name and price.");
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append("name", newItemName);
    formData.append("price", newItemPrice);
    if (newItemImage) {
      formData.append("avatar", newItemImage);
    }

    // Send POST request to API to add new item
    fetch("http://localhost:4000/api/item", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Update items state with the new item
        setItems([...items, data]);
        // Reset input fields
        setNewItemName("");
        setNewItemPrice("");
        setNewItemImage(null);
      })
      .catch((error) => console.error("Error adding item: ", error));
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold 1mb-4">Item Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="w-64 p-2 border rounded mr-2"
        />
        <input
          type="number"
          placeholder="Item Price"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
          className="w-32 p-2 border rounded mr-2"
        />
        <input
          type="file"
          onChange={(e) => setNewItemImage(e.target.files[0])}
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Item
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">${item.price}</td>
              <td className="p-2 border">
                {item.image && (
                  <img
                    src={`http://localhost:4000/images/user/${item.image}`}
                    alt={item.name}
                    className="h-8"
                  />
                )}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 text-white py-1 px-2 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemManagement;

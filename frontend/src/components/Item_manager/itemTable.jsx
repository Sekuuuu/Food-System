import React from "react";
import { useItems } from "../../context/itemContext";

const ItemTable = () => {
    const { items, setItems } = useItems();

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
    
    return(
        <div>
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
                <button className="bg-green-500 text-white py-1 px-2 rounded">
                  Add to today's menu
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}

export default ItemTable
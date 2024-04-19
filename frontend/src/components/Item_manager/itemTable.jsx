import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useItems } from "../../context/itemContext";

// const ItemTable = () => {
//   const { items, setItems } = useItems();
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleDeleteItem = (itemId) => {
//     // Send DELETE request to API to delete item
//     fetch(`http://localhost:4000/api/item/${itemId}`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         // Filter out the deleted item from the items state
//         setItems(items.filter((item) => item._id !== itemId));
//       })
//       .catch((error) => console.error("Error deleting item: ", error));
//   };

//   const filteredItems = items.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="my-5">
//       <h1 className="text-3xl font-semibold mb-4">All Items</h1>
//       <div className="relative flex-grow w-full">
//         <input
//           type="text"
//           placeholder="Search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full h-8 px-4 rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:ring focus:border-gray-400 text-center"
//         />
//         <button
//           id="searchButton"
//           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
//         >
//           <span className="material-symbols-outlined">search</span>
//         </button>
//       </div>
//       <table className="w-full border-collapse border mt-4">
//         <thead>
//           <tr>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Price</th>
//             <th className="p-2 border">Image</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredItems.map((item) => (
//             <tr key={item._id}>
//               <td className="p-2 border text-center">{item.name}</td>
//               <td className="p-2 border text-center">Rs. {item.price}</td>
//               <td className="p-2 border flex justify-center">
//                 {item.image && (
//                   <img
//                     src={`http://localhost:4000/images/user/${item.image}`}
//                     alt={item.name}
//                     className="h-14 rounded-full max-w-14"
//                   />
//                 )}
//               </td>
//               <td className="p-2 border">
//                 <div className=" flex justify-center">
//                 <button
//                   onClick={() => handleDeleteItem(item._id)}
//                   className="bg-red-500 text-white py-1 px-2 rounded mr-2"
//                 >
//                   Delete
//                 </button>
//                 <button className="bg-green-500 text-white py-1 px-2 rounded">
//                   Add to today's menu
//                 </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// };

const ItemTable = () => {
  const { items, setItems } = useItems();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: "",
    item_id: "",
    start_time: "",
    end_time: "",
    quantity: 0,
  });

  useEffect(() => {
    // Fetch categories from the server
    fetch("http://localhost:4000/api/category")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories: ", error));
  }, []);

  const handleAddToMenu = (itemId) => {
    // Handle showing the form
    setFormData({ ...formData, item_id: itemId });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // Submit the form data to the server
    fetch("http://localhost:4000/api/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success
        setShowForm(false);
        toast.success("Item added to menu successfully");
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding item to menu: ", error);
        toast.error("Failed to add item to menu");
      });
  };

  const handleDeleteItem = (itemId) => {
    // Send DELETE request to API to delete item
    fetch(`http://localhost:4000/api/item/${itemId}`, {
      method: "DELETE",
    })
      .then(() => {
        // Filter out the deleted item from the items state
        setItems(items.filter((item) => item._id !== itemId));
        toast.success("Item deleted successfully.", {
          position: "bottom-left",
          autoClose: 3000,
        });
      })
      .catch((error) => console.error("Error deleting item: ", error));
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-5">
      <h1 className="text-3xl font-semibold mb-4">All Items</h1>
      <div className="relative flex-grow w-[75%] py-4 mx-auto">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-8 px-4 py-5 rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:ring focus:border-gray-400 text-center"
          />
          <button
            id="searchButton"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      <table className="w-full border-collapse border mt-4  shadow-md">
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
                  <button
                    onClick={() => handleAddToMenu(item._id)}
                    className="bg-green-500 text-white py-1 px-2 rounded"
                  >
                    Add to today's menu
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white py-4 px-8 rounded w-[25vw]">
            <h2 className="text-2xl font-semibold mb-4">Add to Menu</h2>
            <form onSubmit={handleSubmitForm} className=" flex flex-col gap-5">
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-500 text-sm font-semibold mb-1"
                >
                  Category
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleFormChange}
                  defaultValue={categories.length > 0 ? categories[0]._id : ""}
                  className="w-full p-2 border rounded"
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="startTime"
                  className="block text-gray-500 text-sm font-semibold mb-1"
                >
                  Start Time (HH:MM)
                </label>
                <input
                  type="time"
                  id="start_time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endTime"
                  className="block text-gray-500 text-sm font-semibold mb-1"
                >
                  End Time (HH:MM)
                </label>
                <input
                  type="time"
                  id="end_time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-gray-500 text-sm font-semibold mb-1"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Add to Menu
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemTable;

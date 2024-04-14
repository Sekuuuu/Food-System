import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useItems } from "../../context/itemContext";

const ItemForm = () => {
  const { items, setItems } = useItems();
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemImage, setNewItemImage] = useState(null);

  
  const handleAddItem = () => {
    if (!newItemName || !newItemPrice) {
      toast.error("Enter all fields.", {
        position: "bottom-left",    
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", newItemName);
    formData.append("price", newItemPrice);
    if (newItemImage) {
      formData.append("avatar", newItemImage);
    }

    fetch("http://localhost:4000/api/item", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        setItems((prevItems) => [...prevItems, data]);
        setNewItemName("");
        setNewItemPrice("");
        setNewItemImage(null);
        setImagePreview("");
        
      })
      .catch((error) => console.error("Error adding item: ", error));
  };

  //Image Preview
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const imageInput = document.getElementById("image");
    const imagePreviewElement = document.getElementById("image-preview");

    const handleChange = () => {
      const file = imageInput.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          setImagePreview(e.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        setImagePreview("");
      }
    };

    imageInput.addEventListener("change", handleChange);

    // Cleanup event listener
    return () => {
      imageInput.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div className="my-5">
      <h1 className="text-3xl font-semibold mb-4">Item Creation</h1>

      <div className="border border-gray-300 rounded p-4">
        <div className="mb-4">
          {/* <label htmlFor="itemName" className="block text-gray-700 font-medium">
            Item Name
          </label> */}
          <input
            type="text"
            id="itemName"
            placeholder="Enter Item Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className=" w-96 p-2 border rounded"
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          {/* <label
            htmlFor="itemPrice"
            className="block text-gray-700 font-medium"
          >
            Item Price
          </label> */}
          <input
            type="number"
            id="itemPrice"
            placeholder="Enter Item Price"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
            className="w-96 p-2 border rounded"
          />
        </div>
        {/* Image File Input (with improved styling) */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium">
            Image
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
              <span>Upload a file</span>
              <input
                id="image"
                name="image"
                type="file"
                className="sr-only"
                onChange={(e) => setNewItemImage(e.target.files[0])}
                accept="image/*"
                required
              />
            </label>
            <p className="text-gray-500">or drag and drop</p>
          </div>
          <p className="mt-2 text-sm text-gray-500" id="image-description">
            JPEG, PNG, GIF up to 5MB
          </p>

          {imagePreview && (
            <div className="mb-4 text-center">
              <img
                id="image-preview"
                className="image-preview rounded-full mx-auto max-h-[23vh] "
                src={imagePreview}
                alt="Image Preview"
              />
            </div>
          )}
        </div>
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Item
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ItemForm;

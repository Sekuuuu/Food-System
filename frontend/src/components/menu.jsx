import React, { useState, useEffect } from "react";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/item")
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div>
      <div className="container flex justify-center mx-auto">
        <div className="flex flex-col justify-center">
          <div className=" flex justify-center text-2xl pb-4">
            Menu
          </div>

          {/* Map through the categories here */}
          <div className="flex justify-center pb-4">
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Button
            </button>
          </div>
          <div className="w-full">
            <div className="border-b border-gray-200 shadow">
              <table className="divide-y divide-gray-300 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Image</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Available Time</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Price
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">Available</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Quantity</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Order</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {/* Map through the items here */}
                  {menuItems.map(item => (
                    <tr key={item._id} className="whitespace-nowrap">
                      <td className="px-6 py-4 text-sm text-gray-500">{item.name}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <img
                            src={`http://localhost:4000/images/user/${item.image}`}
                            alt={item.name}
                            className="cursor-pointer h-10"
                            onClick={() => handleImageClick(item.image)}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          8:00 AM - 10:00 AM
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        20
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            className="p-2 px-3 text-sm bg-yellow-600 rounded-full"
                            // onClick={() => handleQuantityChange(-1)} // Decrease quantity by 1
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="w-10 text-center border mx-2 "
                            style={{WebkitAppearance: "none"}}
                            // value={quantity}
                            // onChange={(e) => setQuantity(parseInt(e.target.value) || 0)} // Ensure value is a number
                          />
                          <button
                            className="p-2 px-3 text-sm bg-yellow-600 rounded-full"
                            // onClick={() => handleQuantityChange(1)} // Increase quantity by 1
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full"
                        >
                          Order
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

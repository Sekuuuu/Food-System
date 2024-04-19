import React, { useState, useEffect } from "react";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/item")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items: ", error));

    fetch("http://localhost:4000/api/category")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories: ", error));

    fetch("http://localhost:4000/api/menu")
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error fetching menu items: ", error));
  }, []);

  useEffect(() => {
    const combinedData = menuItems.map((menu) => {
      const item = items.find((item) => item._id === menu.item_id);
      const category = categories.find(
        (category) => category._id === menu.category_id
      );
      return {
        _id: menu._id,
        name: item ? item.name : "",
        image: item ? item.image : "",
        price: item ? item.price : "",
        category: category ? category.name : "",
        startTime: menu.start_time,
        endTime: menu.end_time,
        quantity: menu.quantity,
      };
    });
    setMenuData(combinedData);
  }, [menuItems, categories, items]);

  const filteredMenuData = selectedCategory
    ? menuData.filter((item) => item.category === selectedCategory)
    : menuData;

    const handleCategoryClick = (categoryName) => {
      setSelectedCategory(categoryName === "All" ? null : categoryName);
    };

  return (
    <div>
      <div className="container flex justify-center mx-auto">
        <div className="flex flex-col justify-center">
          <div className="flex justify-center text-2xl pb-4">Menu</div>

          {/* Display categories */}
          <div className="flex justify-center pb-4">
            <button
              key="All"
              className={`inline-flex text-white bg-indigo-500 border-0 py-2 px-6 mx-2 focus:outline-none hover:bg-indigo-600 rounded text-lg ${
                selectedCategory === null ? "bg-indigo-600" : ""
              }`}
              onClick={() => handleCategoryClick("All")}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                className={`inline-flex text-white bg-indigo-500 border-0 py-2 px-4 mx-2 focus:outline-none hover:bg-indigo-600 rounded text-lg ${
                  selectedCategory === category.name ? "bg-indigo-600" : ""
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="w-full">
            <div className="border-b border-gray-200 shadow">
              <table className="divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Image</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Available Time
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">Price</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Available
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Quantity
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">Order</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {/* Map through the filtered menu data */}
                  {filteredMenuData.map((item) => (
                    <tr key={item._id} className="whitespace-nowrap">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <img
                            src={`http://localhost:4000/images/user/${item.image}`}
                            alt={item.name}
                            className="cursor-pointer h-10"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {item.startTime} - {item.endTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">20</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button className="p-2 px-3 text-sm bg-yellow-600 rounded-full">
                            -
                          </button>
                          <input
                            type="number"
                            className="w-10 text-center border mx-2"
                            // value={item.quantity}
                          />
                          <button className="p-2 px-3 text-sm bg-yellow-600 rounded-full">
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

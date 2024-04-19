import React, { useState } from "react";
import { useUser } from "../../context/userContext";
import { toast, ToastContainer } from "react-toastify";

const UserManagement = () => {
  const { users, addUser, editUser, deleteUser } = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  // const filteredUsers = users.filter((user) =>
  //   user.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredUsers = users.filter(
    (user) =>
      user.name &&
      typeof user.name === "string" &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const role = formData.get("role");
    const balance = formData.get("balance");
    const password = "1234";

    await addUser({ name, email, role, password, balance })
      .then(() => {
        toast.success("User added successfully");
        e.target.reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleAddBalance = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const balanceToAdd = parseFloat(formData.get("balanceToAdd"));
  
    editUser(email, balanceToAdd)
      .then(() => {
        toast.success("Balance added successfully");
        e.target.reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  

  const handleDeleteUser = (userId) => {
    deleteUser(userId)
      .then(() => {
        toast.success("User deleted successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 ">User Management</h1>
      <br />

      <div className=" border-2 p-4 rounded-3xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">User Creation</h1>
        <form
          onSubmit={handleAddUser}
          className="mb-4 flex justify-center gap-5 items-center "
        >
          {/* <label className="block mb-2">Name:</label> */}
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            required
            className="border rounded p-2 mb-2"
          />
         
          <input
            type="email"
            name="email"
            placeholder="Enter Email"

            required
            className="border rounded p-2 mb-2"
          />
     
          <select name="role" required className="border rounded p-2 mb-2 bg-gray-600 text-white" defaultValue={null}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value={null} >-- Select Role --</option>
          </select>
          
          <input
            type="number"
            name="balance"
            placeholder="Topup Balance"
            className="border rounded p-2 mb-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mb-2"
          >
            Add User
          </button>
        </form>
      </div>

      <div className=" border-2 p-4 rounded-3xl my-4 shadow-md text-center">
        <h1 className="text-2xl font-bold my-4">Add Balance</h1>
        <form
          onSubmit={handleAddBalance}
          className="mb-4 flex justify-center gap-5 items-center"
        >
          <label className="block mb-2">User Email:</label>
          <input
            type="text"
            name="email"
            required
            className="border rounded p-2 mb-2 mx-4"
          />
          <label className="block mb-2">Balance to Add:</label>
          <input
            type="number"
            name="balanceToAdd"
            required
            className="border rounded p-2 mb-2 mx-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mb-2"
          >
            Add Balance
          </button>
        </form>
      </div>

      <div className=" border-2 p-4 rounded-3xl shadow-md text-center ">
      <h1 className="text-2xl font-bold my-4">All Users</h1>

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

        {/* <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-2 mb-4"
      /> */}
        <br />

        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Balance</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">{user.balance}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded mr-2"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/user")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users: ", error));
  }, []);

  const addUser = async (userData) => {
    try {
      console.log(JSON.stringify(userData));
      const response = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      // const data = await response.json();
      // setUsers((prevUsers) => [...prevUsers, data]);

      const data = await response.json();
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers, data.user];
        console.log("Updated Users:", newUsers); // Check the state immediately after updating
        return newUsers;
      });
    } catch (error) {
      throw new Error("Failed to add user");
    }
  };

  const editUser = async (email, balanceToAdd) => {
    try {
      const response = await fetch(`http://localhost:4000/api/user/editadmin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, balanceToAdd }),
      });
      const data = await response.json();
      setUsers(users.map((user) => (user.email === email ? data : user)));
    } catch (error) {
      throw new Error("Failed to edit user");
    }
  };
  

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:4000/api/user/${userId}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  };

  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

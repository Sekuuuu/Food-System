import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  //form inpuit things
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
      autoClose: 3000, // Close the toast after 3 seconds
    });
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
      autoClose: 3000, // Close the toast after 3 seconds
    });

  //submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      console.log(data);
      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",    
      password: "",
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-indigo-100">
      <div className="w-full md:w-1/3 rounded-lg">
        <h2 className=" text-2xl text-center mb-8">Shibal Foods</h2>

        <form onSubmit={handleSubmit}>
          <div className="w-full mb-2 flex items-center ">
            <input
              className="
              w-full
			  border
			  rounded
			  px-3
			  py-2
			  text-gray-700
			  focus:outline-none"
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="
            w-full
            border
            rounded
            px-3
            py-2
            text-gray-700
            focus:outline-none"
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className=" w-full py-2 mt-8 rounded-full bg-blue-400 text-gray-100 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

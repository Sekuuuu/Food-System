import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Navbar = () => {
  const [cookies, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      // if (!cookies.token) {
      //   navigate("/login");
      //   console.log("No cookies")
      //   return;
      // }

      try {
        const { data } = await axios.post(
          "http://localhost:4000/api/user/",
          {},
          { withCredentials: true }
        );
        const { status, role } = data;
        if (status) {
          setUserRole(role);
          
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        removeCookie("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  if (loading) {
    return null; // or a loading spinner
  }

  const Dashboard = () => {
    navigate("/");
  };
  const Admin = () => {
    navigate("/admin");
  };

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          onClick={Dashboard}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="select-none ml-3 text-xl">Food System</span>
        </a>
        <nav className=" select-none md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 text-x hover:text-gray-900">Today's Menu</a>
          <a className="mr-5 hover:text-gray-900">Feedback</a>
          <a className="mr-5 hover:text-gray-900">Reports</a>
          <a className="mr-5 hover:text-gray-900">Shibal</a>
        </nav>
        {userRole === "admin" && (
          <button className="">
            <span onClick={Admin} className="material-symbols-outlined">
              admin_panel_settings
            </span>
          </button>
        )}
        <button className="pl-10">
          <span onClick={Logout} className="material-symbols-outlined">
            logout
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

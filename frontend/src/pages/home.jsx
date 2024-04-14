import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Menu from "../components/menu";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Footer from "../components/footer";


const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

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
        const { status, user } = data;
        if (status) {
          setUsername(user);
          toast(`Hello ${user}`, {
            position: "bottom-left",
          });
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

  return (
    <>
      {/* <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div> */}
      <Navbar removeCookie={removeCookie} />
      <Hero />
      <Menu />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Home;

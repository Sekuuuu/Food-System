
import { ToastContainer, toast } from "react-toastify";
import Menu from "../components/menu";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Footer from "../components/footer";


const Home = () => {
  

  return (
    <>
      <Navbar />
      <Hero />
      <Menu />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Home;

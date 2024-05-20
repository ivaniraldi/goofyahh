import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import NavBar from "./NavBar";

export default function Home() {
  return (
    <div className="bg-black h-full text-violet-100 sm:h-screen">
<NavBar></NavBar>
      <div className="sm:flex">
        <div
          id="header"
          className="flex justify-center flex-col text-center sm:block sm:p-5 sm:w-1/4"
        >
          <div className="flex justify-center">
            <img className="w-48 mt-6" src={logo} alt="Goofy Ahh Page" />
          </div>
          <h1
            className="text-4xl mt-4 mb-0"
            style={{
              textShadow:
                "0 0 2px #FFF, 0 0 15px #ea35ea, 0 0 25px #ea35ea, 0 0 30px #ea35ea",
            }}
          >
            GOOFY AHH PAGE
          </h1>
          <h4
            className="text-1xl"
            style={{
              textShadow:
                "0 0 1px #FFF, 0 0 8px #ea35ea, 0 0 15px #ea35ea, 0 0 18px #ea35ea",
            }}
          >
            JUST THAT
          </h4>
        </div>
            <img alt="" />
        <div className="flex justify-center mt-12 sm:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center align-middle pb-10 sm:pb-0">
            <Link to={"/guitarjesus"}>
              <motion.button

                className="glow-on-hover w-64 h-16 font-bold text-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fa-solid fa-guitar text-violet-400"></i> Guitar-Jesus
              </motion.button>
            </Link>
            <Link to={"/snake"}>
              <motion.button
                className="glow-on-hover w-64 h-16 font-bold text-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fa-solid fa-staff-snake text-green-500"></i> Snake
              </motion.button>
            </Link>
            <Link to={"/guitarjesus"}>
              <motion.button
                className="glow-on-hover w-64 h-16 font-bold text-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Proximamente..
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

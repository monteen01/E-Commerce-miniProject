/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ShoppingBag, House, LogOut, Menu, X } from "lucide-react";
import { logout } from "../utils/auth";
import InfinityIcon from "./InfinityIcon";

export default function NavBar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const controls = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    controls.start({ y: isVisible ? 0 : -100, transition: { duration: 0.4 } });
  }, [isVisible, controls]);

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      className="p-2 px-4 fixed top-0 left-1/2  transform -translate-x-1/2 flex justify-between items-center md:mt-5 md:rounded-xl  bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-gray-700/70 z-50
                 w-full max-w-3xl"
      initial={{ y: -100 }}
      animate={controls}
    >
      <Link
        to="/"
        className="text-2xl font-semibold text-white flex items-center"
      >
        <InfinityIcon />
      </Link>
      <div className="hidden  space-x-4 md:flex">
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300 flex items-center gap-1">
            <House />
            Home
          </Link>
          <Link
            to="/cart"
            className="hover:text-gray-300 relative flex items-center gap-1"
          >
            <ShoppingBag />
            Cart
            <span className="text-xs text-black font-light bg-white px-2 py-[1px] group-hover:bg-gray-300 rounded-full absolute -right-2 -top-1">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex justify-evenly items-center space-x-8">
        <Link
          onClick={handleLogout}
          to="/login"
          className="flex items-end gap-1 rounded-lg hover:text-gray-300 group"
        >
          <span className="ml-1 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Sign Out
          </span>
          <span>
            <LogOut />
          </span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <>
            <X size={28} color="#e0e0e0" strokeWidth={1.5} />
          </>
        ) : (
          <>
            <Menu size={28} color="#e0e0e0" strokeWidth={1.5} />
          </>
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900 text-white shadow-md flex flex-col space-y-4 p-4 md:hidden">
          <Link
            to="/"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Cart{" "}
            <span className="bg-red-600 text-white rounded-full px-2">
              {cartCount}
            </span>
          </Link>
          <a href="#" className="hover:text-gray-300">
            Favorites
          </a>
          <div className="relative">
            <button className="hover:text-gray-300">Profile</button>
            <div className="bg-gray-900 shadow-md rounded-md mt-2">
              <Link
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                to="/login"
                className="block py-2 text-gray-100 hover:text-gray-300"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}

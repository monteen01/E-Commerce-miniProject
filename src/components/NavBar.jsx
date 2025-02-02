/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, House, Book, LogOut } from "lucide-react";
// import { FcMindMap } from "react-icons/fc";
export default function NavBar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <nav className="text-white bg-gray-900 p-4 flex justify-between items-center ">
      <Link className=" text-2xl font-bold text-white flex gap-1 items-center ">
        Ec
        <span id="logo-loader" className=" text-gradient ">
          o
        </span>
        m{" "}
      </Link>

      <div className="hidden md:flex space-x-8 text-lg text-gray-100 items-center">
        <Link to="/" className="hover:text-white flex gap-1  ">
          <House /> Home
        </Link>
        <Link to="/cart" className="hover:text-gray-300 relative flex gap-1  ">
          <ShoppingBag />
          Cart
          <span className=" text-xs  text-white font-light bg-red-800 px-2 py-[1px]  rounded-full  absolute -right-2 -top-1  ">
            {cartCount}
          </span>{" "}
        </Link>
        <a href="#" className="hover:text-white flex gap-1">
          <Book />
          Description
        </a>
        <Link
          onClick={handleLogout}
          to="/login"
          className=" px-3 py-2 text-gray-100 bg-gray-900 flex gap-1  inset-ring-1 inset-ring-red-900 rounded-lg hover:inset-ring-red-700"
        >
          <span>
            <LogOut />
          </span>{" "}
          Sign Out
        </Link>
      </div>

      <button className="md:hidden " onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Menu"}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 text-white shadow-md md:hidden flex flex-col space-y-4 p-4">
          <Link to="/" className="hover:text-gray-300">
            Products
          </Link>
          <Link to="/cart" className="hover:text-gray-300 ">
            Cart{" "}
            <span className="bg-red-600 text-white rounded-full px-2  ">
              {cartCount}
            </span>{" "}
          </Link>
          <a href="#" className="hover:text-gray-300">
            Favorites
          </a>
          <div className="relative">
            <button className="hover:text-gray-300">Profile</button>
            <div className="bg-gray-900 shadow-md rounded-md mt-2">
              <Link
                onClick={handleLogout}
                to="/login"
                className="block py-2 text-gray-100 hover:text-gray-300"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

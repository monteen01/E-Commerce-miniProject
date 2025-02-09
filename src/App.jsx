import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  NavBar,
  Hero,
  Products,
  CartPage,
  Signup,
  Login,
  ProtectedRoute,
  ProductDescription,
} from "./components/components";
import toast, { Toaster } from "react-hot-toast";
import { isAuthenticated } from "./utils/auth";
import "./App.css";

function App() {
  // State
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = "https://fakestoreapi.com/products";

  // Checking authentication on app load
  useEffect(() => {
    const loggedInUser = isAuthenticated();
    if (
      !loggedInUser &&
      !["/login", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  // Fetch products
  const fetchProducts = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endPoint = query
        ? `${API_URL}/category/${encodeURIComponent(query)}`
        : API_URL;

      const response = await fetch(endPoint);
      if (!response.ok) {
        throw new Error("Failed to fetch the data");
      }

      const data = await response.json();
      setProducts(data);

      if (data.length === 0) {
        setErrorMessage("No products found.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorMessage("Error fetching products.");
    } finally {
      setIsLoading(false);
    }
  };

  // cart operations
  const cartOperations = {
    // add to cart
    addToCart: (product) => {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
      toast.success("Product added to cart");
    },
    // remove from cart
    removeFromCart: (productId) => {
      setCart((prev) => prev.filter((item) => item.id !== productId));
      toast.success("Product removed from cart");
    },
    // update quantity
    updateQuantity: (productId, newQuantity) => {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    },
  };

  useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery]);

  return (
    <main className="bg-[#021526]">
      <Toaster />

      <section
        id="navbar"
        className="h-full w-full flex justify-center align-center"
      >
        <NavBar cartCount={cart.length} />
      </section>

      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <>
                <Hero
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  fetchProducts={fetchProducts}
                />
                <Products
                  errorMessage={errorMessage}
                  products={products}
                  isLoading={isLoading}
                  cartOperations={cartOperations}
                />
              </>
            }
          />
          <Route
            path="/cart"
            element={<CartPage cart={cart} cartOperations={cartOperations} />}
          />
          <Route path="/description/:id" element={<ProductDescription />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
